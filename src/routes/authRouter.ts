import express from "express";
import { authController } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", authController.createUser);
authRouter.post("/login", authController.loginUser);
