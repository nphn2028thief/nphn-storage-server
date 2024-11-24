import nodemailer from "nodemailer";

import envConfig from "./env";

const mailerTransporter = nodemailer.createTransport({
  host: envConfig.smtpHost,
  port: Number(envConfig.smtpPort),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: envConfig.smtpUser,
    pass: envConfig.smtpPassword,
  },
});

export default mailerTransporter;
