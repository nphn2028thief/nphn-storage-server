import { Response } from "express";
import createHttpError from "http-errors";

import i18nKey from "../constants/i18n";

const response = {
  success: (res: Response, message?: string, key?: any, data?: any) => {
    return res.json({
      message,
      [key]: data,
    });
  },
  badRequest: (res: Response, message?: string) => {
    const err = createHttpError.BadRequest(message || "Invalid data!");
    return res.status(err.status).send({
      message: err.message,
    });
  },
  unauthorized: (res: Response, message?: string) => {
    const err = createHttpError.Unauthorized(message || "Unauthorized.");
    return res.status(err.status).send({
      message: err.message,
    });
  },
  forbidden: (res: Response) => {
    const err = createHttpError.Forbidden("Invalid or expired token.");
    return res.status(err.status).send({
      message: err.message,
    });
  },
  notFound: (res: Response, message?: string) => {
    const err = createHttpError.NotFound(message || "Not found!");
    return res.status(err.status).send({
      message: err.message,
    });
  },
  conflict: (res: Response, message: string) => {
    const err = createHttpError.Conflict(message);
    return res.status(err.status).send({
      message: err.message,
    });
  },
  error: (res: Response) => {
    const err = createHttpError.InternalServerError(i18nKey.SERVER_ERROR);

    return res.status(err.status).send({
      message: err.message,
    });
  },
};

export default response;
