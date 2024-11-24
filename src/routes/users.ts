import type { Router } from "express";

import UserController from "../controllers/UserController";
import verifyToken from "../middleware/auth";

const userRoutes = (router: Router) => {
  router.post("/auth/getOtp", UserController.getOtpCode);
  router.post("/auth/signIn", UserController.signIn);
  router.get("/auth/getMe", verifyToken, UserController.getMe);
  router.post("/auth/signUp", UserController.signUp);
};

export default userRoutes;
