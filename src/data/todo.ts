import { db } from "./database";
import { Todo } from "../models/todo";

export async function getTodo(): Promise<Todo[]> {
  const query: string = "SELECT * FROM TB_TODO where email = ?";
  return db.execute(query, []).then((result: any) => result[0]);
}

export async function createTodo(todo: Todo): Promise<Todo> {
  const query: string =
    "INSERT INTO TB_TODO(email, todoname, todostatus, todoDate) VALUES(?, ?, ?, NOW())";
  return db
    .execute(query, [todo.email, todo.todoname, todo.todostatus])
    .then((result: any) => result[0]);
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const query: string =
    "UPDATE TB_TODO SET todoname = ?, todostatus = ?, todoDate = NOW() WHERE email = ?";
  return db
    .execute(query, [todo.todoname, todo.todostatus, todo.email])
    .then((result: any) => result[0]);
}

export async function deleteTodo(todo: Todo): Promise<void> {
  const query: string = "DELETE FROM TB_TODO WHERE email = ? AND todoname = ?";
  return db
    .execute(query, [todo.email, todo.todoname])
    .then((result: any) => result[0]);
}
