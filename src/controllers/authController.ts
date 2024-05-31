import { Request, Response } from "express";
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { StringExpressionOperator } from "mongoose";

export const authController = {
  createUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const createUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const saved = await createUser.save();

    return res.json(saved);
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordMatch) {
      return res.status(404).json({ message: "password incorrect" });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return res.json({ user: payload, token });
  },
};
