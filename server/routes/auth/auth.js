import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerSchema } from "./validation";

dotenv.config();
const prisma = new PrismaClient();
const userRouter = Router();
const saltRounds = 10;

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags: [Auth]
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User registered successfully
 */
userRouter.route("/register").post(async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Auth]
 *    summary: Login a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *                example: password
 *                description: Password of the user
 *                required: true
 *                minLength: 6
 *                maxLength: 12
 *    responses:
 *      200:
 *        description: User logged in successfully
 *      400:
 *        description: Invalid email or password
 */
userRouter.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default userRouter;

