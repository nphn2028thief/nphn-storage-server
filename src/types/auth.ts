export type TGetOtpCode = {
  email: string;
};

export interface ISignIn {
  userId: number;
  otpCode: string;
}

export interface ISignUp {
  fullName: string;
  email: string;
}
