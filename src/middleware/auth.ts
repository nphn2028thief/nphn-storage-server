import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

import response from "../configs/response";
import envConfig from "../configs/env";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    response.unauthorized(res);
  }

  try {
    const { userId } = JWT.verify(
      token,
      envConfig.tokenSecret
    ) as JWT.JwtPayload;

    if (!userId) {
      response.notFound(res, "User not found.");
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.log("Verify token error: ", error);
    response.forbidden(res);
  }
};

export default verifyToken;
