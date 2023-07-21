import { Router } from "express";
import { makeCreateUserController } from "../controllers/userController";

export default function userRouter(router: Router) {
  router.post("/create-user", makeCreateUserController());

  return router;
}
