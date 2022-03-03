import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import * as util from "../util/util";

const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";

//임시 서버 메모리 저장 리프레쉬 토큰
//TODO 리프레쉬 토큰 DB저장으로 바꿔야함
let refreshTokens: Array<string> = [];

export async function login(req: Request, res: Response) {
  //copilot 추천 코드
  //  const { email, password } = req.body;
  //  const user = await util.findUserByEmail(email);
  //  if (!user) {
  //    return res.status(400).send({
  //      message: "User not found",
  //    });
  //  }
  //  const isMatch = await bcrypt.compare(password, user.password);
  //  if (!isMatch) {
  //    return res.status(400).send({
  //      message: "Password is incorrect",
  //    });
  //  }
  //  const accessToken = generateAccessToken(user);
  //  const refreshToken = jwt.sign(
  //    { userId: user.id },
  //    REFRESH_TOKEN_SECRET,
  //    { expiresIn: "7d" }
  //  );
  //  refreshTokens.push(refreshToken);
  //  res.send({
  //    accessToken,
  //    refreshToken,
  //  });
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
