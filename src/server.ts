import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import "dotenv/config";

import AuthRouter from "./routes/auth.route";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || "4000";

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});
