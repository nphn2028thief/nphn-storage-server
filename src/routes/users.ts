import type { Router } from "express";

const userRoutes = (router: Router) => {
  router.post("/auth/getOtp", (req, res) => {
    res.json("Hello get otp");
  });
  router.post("/auth/signIn", (req, res) => {
    res.json("Hello sign in");
  });
};

export default userRoutes;
