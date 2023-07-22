import express from "express";
import { UserController } from "./controllers/userController";
import { UserRepository } from "./data/userRepository";
import { UserAvatarService } from "./infrastructure/userAvatarService";
import { CreateUserUseCase } from "./usecases/createUserUseCase";

const app = express();
const userRepository = new UserRepository();
const userAvatarService = new UserAvatarService();
const createUserUseCase = new CreateUserUseCase(
  userRepository,
  userAvatarService,
);
const userController = new UserController(createUserUseCase);

app.use(express.json());

// Create user route
app.post("/create-user", (req, res) => userController.createUser(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
