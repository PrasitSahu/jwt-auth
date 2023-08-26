// imporing dependencies
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"

// importing routers
import { authRouter } from "./routers";

dotenv.config();

// variables
const app: Express = express();
const PORT = process.env.PORT || 5400;

// functions
async function connectDB(url: string): Promise<typeof mongoose> {
  const conn = await mongoose.connect(url);
  return conn;
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, "../..", "client", "build")));
// routers
app.use("/auth", authRouter);

// routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.resolve(__dirname, "../..", "client", "build", "index.html")
  );
});

connectDB(process.env.DB_URL as string).then((res) => {
  console.log(`DB connected!`)
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
})
.catch(err => {
  throw new Error(`Error: ${err.message}`)
})
