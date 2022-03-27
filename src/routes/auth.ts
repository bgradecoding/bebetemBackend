import express from "express";
import { body } from "express-validator";
import * as authController from "../controller/auth";

var router = express.Router();

const validateCredential = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
];

router.post("/token", authController.tokenValidator);

router.delete("/logout", authController.logout);

router.post("/login", validateCredential, authController.login);

router.post("/user", authController.createUser);

export default router;
