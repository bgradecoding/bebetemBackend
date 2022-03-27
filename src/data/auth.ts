import { db } from "./database";
import { Login } from "../models/auth";

export async function login(email: string): Promise<Login> {
  const query: string = `SELECT email, password, nickname FROM TB_USER WHERE email = '${email}'`;
  return db.query(query).then((result: any) => result.rows[0]);
}

export async function createUser(user: Login): Promise<void> {
  const query: string = `INSERT INTO TB_USER(email, password, nickname, created) VALUES('${
    user.email
  }', '${user.password}', '${user.nickname}', '${new Date().toISOString()}');`;
  return db.query(query, (err: any, res: any) => {});
}

export async function checkDupEmail(email: string): Promise<Login> {
  const query: string = `SELECT email FROM TB_USER WHERE email = '${email}';`;
  const result: Login = await db
    .query(query)
    .then((result: any) => result.rows[0]);
  return result;
}
