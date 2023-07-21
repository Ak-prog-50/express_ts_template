import { createUser as createUserInteractor } from "../interactors/user.interactor";
import { TExpressCallback } from "../types/expressTypes";
import AppResponse from "../utils/AppResponse";
import AppError from "../utils/error-handling/AppErrror";
import errHandlerAsync from "../utils/error-handling/errHandlerAsync";
import { isTInteractorReturn } from "../types/generalTypes";
import appErrorHandler from "../utils/error-handling/appErrorHandler";

function makeCreateUserController(): TExpressCallback {
  return async (req, res, next) => {
    const { username, password } = req.body;
    const createUserDB = {
      saveUser: () => console.log("saving user"),
    };
    const [result, unHandledErr] = await errHandlerAsync(
      createUserInteractor(username, password, createUserDB),
    );
    if (unHandledErr) {
      appErrorHandler(unHandledErr, req, res, next);
      return;
    } else if (isTInteractorReturn(result)) {
      if (result === null) {
        const createdUser = {};
        AppResponse.created(res, "User created", createdUser);
        return;
      }
      if (result instanceof AppError) {
        appErrorHandler(result, req, res, next);
        return;
      }
    }
  };
}

export { makeCreateUserController };
