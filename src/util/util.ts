import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  const token: string | undefined = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

export function generateToken(user: any) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "40m" });
}

export function getUserEmailFormToken(req: Request) {
  const authHeader = req.headers["authorization"];

  const token: string | undefined = authHeader && authHeader.split(" ")[1];
  if (token == null) return null;

  const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
  return decoded.email;
}
