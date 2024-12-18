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
      if (err) {
        reject(err);
      }

      res.cookie("token", token, {
        httpOnly: true,
        secure: envConfig.nodeEnv === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });
      resolve(token);
    });
  });
};

export default signToken;
