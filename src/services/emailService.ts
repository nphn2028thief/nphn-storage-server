import envConfig from "../configs/env";
import mailerTransporter from "../configs/mailer";
import { emailTemplate } from "../constants/email";

const sendOtpEmail = async (email: string, otpCode: string): Promise<void> => {
  try {
    // Replace placeholders with dynamic content
    const emailHtml = emailTemplate.replace("{{OTP_CODE}}", otpCode);

    await mailerTransporter.sendMail({
      from: envConfig.smtpUser,
      to: email,
      subject: "Your OTP code",
      html: emailHtml,
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

export { sendOtpEmail };
