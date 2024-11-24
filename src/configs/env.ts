const envConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  port: process.env.PORT || "5000",
  tokenSecret: process.env.TOKEN_SECRET || "",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: process.env.SMTP_PORT || 587,
  smtpUser: process.env.SMTP_USER || "",
  smtpPassword: process.env.SMTP_PASS || "",
};

export default envConfig;
