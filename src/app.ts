import express, { Request, Response } from "express";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);

// 서버 에러 처리 미들웨어 - 마지막 보루
app.use((error: any, req: Request, res: Response) => {
  res.sendStatus(500);
});

app.listen(8000, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});
