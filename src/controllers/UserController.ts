import { Request, Response } from "express";
import { and, eq, gt } from "drizzle-orm";

import response from "../configs/response";
import i18nKey from "../constants/i18n";
import { db } from "../db";
import { users } from "../db/schema";
import { sendOtpEmail } from "../services/emailService";
import signToken from "../services/jwtService";
import { generateOtp } from "../services/otpService";
import { TGetOtpCode, ISignIn, ISignUp } from "../types/auth";
import {
  getOtpCodeValidate,
  signInValidate,
  signUpValidate,
} from "../validation/auth";

class UserController {
  // Get OTP
  public async getOtpCode(req: Request, res: Response) {
    const { error, value } = getOtpCodeValidate(req.body as TGetOtpCode);

    if (error) {
      response.badRequest(res, error.details[0].message);
      return;
    }

    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, value.email));

      if (!user.length) {
        response.notFound(res, i18nKey.INCORRECT_EMAIL);
        return;
      }

      const { otpCode, expiresAt } = await generateOtp();
      await sendOtpEmail(value.email, otpCode);
      await db.update(users).set({
        otpCode,
        expiresAt,
      });

      response.success(res, "", "data", { userId: user[0].id });
      return;
    } catch (error) {
      response.error(res);
    }
  }

  // Sign in
  public async signIn(req: Request, res: Response) {
    const { error, value } = signInValidate(req.body as ISignIn);

    if (error) {
      response.badRequest(res, error.details[0].message);
      return;
    }

    try {
      const validUser = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.id, value.userId),
            eq(users.otpCode, value.otpCode),
            gt(users.expiresAt, new Date())
          )
        );

      if (!validUser.length) {
        response.badRequest(res, i18nKey.INVALID_OTP);
        return;
      }

      const token = await signToken(validUser[0].id, res);

      await db
        .update(users)
        .set({
          otpCode: null,
          token: token as string,
          expiresAt: null,
        })
        .where(eq(users.id, value.userId));

      response.success(res, i18nKey.SIGN_IN_SUCCESS);
      return;
    } catch (error) {
      response.error(res);
    }
  }

  // Get me
  public async getMe(req: Request, res: Response) {
    const userId = req.userId;
    const token = req.cookies.token;

    try {
      const user = await db
        .select()
        .from(users)
        .where(and(eq(users.id, userId!), eq(users.token, token)));

      if (!user.length) {
        response.forbidden(res);
        return;
      }

      response.success(res, "", "data", {
        id: user[0].id,
        fullName: user[0].fullName,
        email: user[0].email,
        avatar: user[0].avatar,
      });
    } catch (error) {
      response.error(res);
    }
  }

  // Sign up
  public async signUp(req: Request, res: Response) {
    const { error, value } = signUpValidate(req.body as ISignUp);

    if (error) {
      response.badRequest(res, error.details[0].message);
      return;
    }

    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, value.email));

      if (existingUser.length) {
        response.conflict(res, "Email is already exist.");
        return;
      }

      await db
        .insert(users)
        .values({ fullName: value.fullName, email: value.email });

      response.success(res, i18nKey.SIGN_UP_SUCCESS);
      return;
    } catch (error) {
      response.error(res);
    }
  }
}

export default new UserController();
