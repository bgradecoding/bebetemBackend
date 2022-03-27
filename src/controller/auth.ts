import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import * as util from "../util/util";
import * as authData from "../data/auth";
import { Login } from "../models/auth";

const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";

//임시 서버 메모리 저장 리프레쉬 토큰
//TODO 리프레쉬 토큰 DB저장으로 바꿔야함
let refreshTokens: Array<string> = [];

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const loginUser: Login = await authData.login(email);
  if (!loginUser) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const isValidPassword = await bcrypt.compare(password, loginUser.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const jwtTokenObject: Partial<Login> = {
    email: loginUser.email,
  };
  const accesToken = util.generateToken(jwtTokenObject);
  const refreshToken = jwt.sign(jwtTokenObject, REFRESH_TOKEN_SECRET);

  //TODO : RefreshToken DB에 저장하는 로직 필요
  refreshTokens.push(refreshToken);
  res
    .status(200)
    .json({ ...loginUser, password: "", accesToken, refreshToken });
}

export function logout(req: Request, res: Response) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
}

export function tokenValidator(req: Request, res: Response) {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    const accesToken = util.generateToken(user);
    res.json(accesToken);
  });
}

export function createUser(req: Request, res: Response) {
  const { email, password, nickname } = req.body;
  const hashedPassword = bcrypt.hashSync(
    password,
    process.env.BCRYPT_SALT_ROUNDS!
  );
  const user: Login = {
    email,
    password: hashedPassword,
    nickname,
  };
  authData.createUser(user);
  res.sendStatus(200);
}
