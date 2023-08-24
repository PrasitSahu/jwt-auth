// imporing dependencies
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// variables
const app: Express = express();
const PORT = process.env.PORT || 5400;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../..", "client", "build")));

// routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
