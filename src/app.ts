import express, { Request, Response } from "express";
import authRouter from "./routes/auth";
import todoRouter from "./routes/todo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/todo", todoRouter);

// 서버 에러 처리 미들웨어 - 마지막 보루
app.use((error: any, req: Request, res: Response) => {
  res.sendStatus(500);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});
