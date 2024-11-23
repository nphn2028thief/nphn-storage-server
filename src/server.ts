import app from "./app";
import envConfig from "./configs/env";

const PORT = envConfig.port;

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
