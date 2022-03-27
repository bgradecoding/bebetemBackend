import express, { Request, Response, NextFunction } from "express";
import * as todoController from "../controller/todo";
import * as util from "../util/util";

var router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  util.authenticateToken(req, res, next);
});

router.get("/todo", todoController.getTodo);

router.post("/todo", todoController.createTodo);

router.put("/todo", todoController.updateTodo);

router.delete("/todo", todoController.deleteTodo);

export default router;
