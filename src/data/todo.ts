import { db } from "./database";
import { Todo } from "../models/todo";

export async function getTodo(email: string): Promise<Todo[]> {
  const query: string = "SELECT * FROM TB_TODO where email = ?";
  return db.execute(query, [email]).then((result: any) => result[0]);
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
    "UPDATE TB_TODO SET todostatus = ? WHERE email = ? AND id = ?";
  return db
    .execute(query, [todo.todostatus, todo.email, todo.id])
    .then((result: any) => result[0]);
}

export async function deleteTodo(todo: Todo): Promise<void> {
  const query: string = "DELETE FROM TB_TODO WHERE email = ? AND id = ?";
  return db
    .execute(query, [todo.email, todo.id])
    .then((result: any) => result[0]);
}
