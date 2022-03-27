import { Request, Response } from "express";
import { Todo } from "../models/todo";
import * as todoData from "../data/todo";

export async function getTodo(req: Request, res: Response) {
  const todoList: Todo[] = await todoData.getTodo();
  res.status(200).json(todoList);
}

export async function createTodo(req: Request, res: Response) {
  const newTodo: Todo = req.body;
  const todo: Todo = await todoData.createTodo(newTodo);
  res.status(200).json(todo);
}

export async function updateTodo(req: Request, res: Response) {
  const todo: Todo = req.body;
  const updatedTodo: Todo = await todoData.updateTodo(todo);
  res.status(200).json(updatedTodo);
}

export async function deleteTodo(req: Request, res: Response) {
  const todo: Todo = req.body;
  await todoData.deleteTodo(todo);
  res.sendStatus(204);
}
