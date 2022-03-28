import { db } from "./database";
import { Todo } from "../models/todo";

export async function getTodo(email: string): Promise<Todo[]> {
  const query: string = `SELECT * FROM TB_TODO where email = '${email}';`;
  db.connect();
  return db.query(query).then((result: any) => result.rows);
}

export async function createTodo(todo: Todo): Promise<number> {
  const query: string = `INSERT INTO TB_TODO(email, todoname, todostatus, todoDate) VALUES('${
    todo.email
  }', '${todo.todoname}', '${
    todo.todostatus
  }', '${new Date().toISOString()}');`;
  return db.query(query).then((result: any) => result.rowCount);
}

export async function updateTodo(todo: Todo): Promise<number> {
  const query: string = `UPDATE TB_TODO SET todostatus = '${todo.todostatus}' WHERE email = '${todo.email}' AND id = ${todo.id};`;
  return db.query(query).then((result: any) => result.rowCount);
}

export async function deleteTodo(todo: Todo): Promise<void> {
  const query: string = `DELETE FROM TB_TODO WHERE email = '${todo.email}' AND id = '${todo.id}';`;
  return db.query(query).then((result: any) => result.rowCount);
}
