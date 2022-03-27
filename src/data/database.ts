import { Client } from "pg";

const pool = new Client({
  host: process.env.DB_HOST, // 호스트 주소
  user: process.env.DB_USER, // mysql user
  port: 5432, // mysql port
  password: process.env.DB_PASSWORD, // mysql password
  database: process.env.DB_DATABASE, // mysql 데이터베이스
});

export const db = pool;
