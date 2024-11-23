import { Router } from "express";

import userRoutes from "./users";
import fileRoutes from "./files";

const router = Router();

const routes = () => {
  userRoutes(router);
  fileRoutes(router);
  return router;
};

export default routes;
