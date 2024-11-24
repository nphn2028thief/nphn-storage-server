import Joi from "joi";

import { TGetOtpCode, ISignIn, ISignUp } from "../types/auth";

const getOtpCodeValidate = (data: TGetOtpCode) => {
  const rule = Joi.object<TGetOtpCode>({
    email: Joi.string().email().required().messages({
      "string.empty": "Email can not be empty.",
      "string.email": "Email is invalid.",
      "any.required": "Email is required.",
    }),
  });

  return rule.validate(data);
};

const signInValidate = (data: ISignIn) => {
  const rule = Joi.object<ISignIn>({
    userId: Joi.number().required().messages({
      "string.empty": "User is invalid.",
      "any.required": "Bad request.",
    }),
    otpCode: Joi.string().min(6).max(6).required().messages({
      "string.empty": "OTP is invalid.",
      "string.min": "OTP is incorrect.",
      "string.max": "OTP is incorrect.",
      "any.required": "OTP is required.",
    }),
  });

  return rule.validate(data);
};

const signUpValidate = (data: ISignUp) => {
  const rule = Joi.object<ISignUp>({
    fullName: Joi.string().min(3).required().messages({
      "string.empty": "Full name can not be empty.",
      "string.min": "Full name must be at least 3 character(s)",
      "any.required": "Full name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email can not be empty.",
      "string.email": "Email is invalid.",
      "any.required": "Email is required.",
    }),
  });

  return rule.validate(data);
};

export { getOtpCodeValidate, signInValidate, signUpValidate };
