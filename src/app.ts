import express, { Request, Response } from "express";
import authRouter from "./routes/auth";
import todoRouter from "./routes/todo";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import cors from "cors";

const app = express();

const openAPIDocument = yaml.load("./src/api/swagger.yaml");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://todo-pre.herokuapp.com",
    credentials: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocument));

app.use("/", authRouter);
app.use("/todo", todoRouter);

// 서버 에러 처리 미들웨어 - 마지막 보루
app.use((error: any, req: Request, res: Response) => {
  res.sendStatus(500);
});

app.listen(process.env.PORT, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});
