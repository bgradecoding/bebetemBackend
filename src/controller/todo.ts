import { Request, Response } from "express";
import { Todo } from "../models/todo";
import * as todoData from "../data/todo";
import * as util from "../util/util";

export async function getTodo(req: Request, res: Response) {
  const email: string = util.getUserEmailFormToken(req);
  const todoList: Todo[] = await todoData.getTodo(email);
  res.status(200).json(todoList);
}

export async function createTodo(req: Request, res: Response) {
  const newTodo: Todo = req.body;
  const todo: number = await todoData.createTodo(newTodo);
  res.status(200).json({ message: `${todo}건 create` });
}

export async function updateTodo(req: Request, res: Response) {
  const todo: Todo = req.body;
  const updatedNum: number = await todoData.updateTodo(todo);
  res.status(200).json({ message: `${updatedNum}건 update` });
}

export async function deleteTodo(req: Request, res: Response) {
  const todo: Todo = req.body;
  await todoData.deleteTodo(todo);
  res.status(204).json({ message: `삭제 완료` });
}
