import { Response } from "express";
import JWT from "jsonwebtoken";

import envConfig from "../configs/env";

const signToken = async (userId: number, res: Response) => {
  return new Promise((resolve, reject) => {
    const payload: JWT.JwtPayload = {
      userId,
    };
    const tokenSecret: JWT.Secret = envConfig.tokenSecret;
    const options: JWT.SignOptions = {
      expiresIn: "1h",
    };

    JWT.sign(payload, tokenSecret, options, (err, token) => {
      if (err || !token) {
        reject(err);
      }

      // On local (dev env)
      if (envConfig.nodeEnv === "development") {
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 3600000, // 60 minutes
          // maxAge: 60000, // 1 minute
        });
      } else {
        const cookie = `token=${token}; httpOnly; Secure; SameSite=None; Max-Age=3600000`;
        res.setHeader("Set-Cookie", cookie);
      }

      resolve(token);
    });
  });
};

export default signToken;
