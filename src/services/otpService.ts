interface IGenerateOtp {
  otpCode: string;
  expiresAt: Date;
}

const generateOtp = async (): Promise<IGenerateOtp> => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 5); // OTP valid for 5 minutes

  return { otpCode, expiresAt };
};

export { generateOtp };
