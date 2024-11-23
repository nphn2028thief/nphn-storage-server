const envConfig = {
  databaseUrl: process.env.DATABASE_URL || "",
  port: process.env.PORT || "5000",
};

export default envConfig;
