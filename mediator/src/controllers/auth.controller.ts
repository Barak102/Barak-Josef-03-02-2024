import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisteredUserDto } from "../types/registered-user.dto";

export class AuthController {
  private authService: AuthService = new AuthService();

  constructor() {}

  register = (req: Request, res: Response): void => {
    const registerData: RegisteredUserDto = req.body;
    const clientId = this.authService.register(registerData);
    res.status(201).json({ clientId });
  };
}
