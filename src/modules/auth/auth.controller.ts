import { Request, Response } from "express";
import * as authService from "./auth.service";
import {
  verificationErrorHTML,
  verificationSuccessHTML,
} from "../../utils/email.template";



export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token = req.params.token as string;
    const { name } = await authService.verifyEmail(token);
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(verificationSuccessHTML(name));
  } catch (error: any) {
    res.setHeader("Content-Type", "text/html");
    res.status(400).send(verificationErrorHTML(error.message));
  }
};
