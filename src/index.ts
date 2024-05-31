import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { bookRouter } from "./routes/bookRouter";
import { authRouter } from "./routes/authRouter";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("Mongo Connected"))
  .catch(() => console.error("Mongo connection error!"));

const app = express();

// setup body parser -> biar bisa nerima formData
app.use(express.json()); // untuk membaca json
app.use(express.urlencoded({ extended: true })); // untuk membaca formData
app.use(express.static("public")); // untuk serving  static files

app.use(cors({ origin: ["http://localhost:5173"] }));

app.use("/books", bookRouter);
app.use("/auth", authRouter);

// app.get("/", (req, res) => res.json({ message: "Hello world!" }));

app.listen(8000);
