import { db } from "./database";
import { Login } from "../models/auth";

export async function login(email: string): Promise<Login> {
  db.connect();
  const query: string =
    "SELECT email, password, nickname FROM TB_USER WHERE email = ?";
  return db.query(query, [email]).then((result: any) => result[0][0]);
}

export async function createUser(user: Login): Promise<void> {
  db.connect();
  const query: string =
    "INSERT INTO TB_USER(email, password, nickname, created) VALUES(?, ?, ?, NOW())";
  return db
    .query(query, [user.email, user.password, user.nickname])
    .then((result: any) => result[0]);
}

export async function checkDupEmail(email: string): Promise<Login> {
  db.connect();
  const query: string = "SELECT email FROM TB_USER WHERE email = ?";
  return db.query(query, [email]).then((result: any) => result[0][0]);
}
