import { Request, Response } from "express";
import { CreateUserUseCase } from "../usecases/createUserUseCase";

class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await this.createUserUseCase.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export { UserController };
