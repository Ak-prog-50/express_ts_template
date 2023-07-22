import { createUser as createUserInteractor } from "../interactors/user.interactor";
import { TExpressCallback } from "../types/expressTypes";
import AppResponse from "../utils/AppResponse";
import AppError from "../utils/error-handling/AppErrror";
import errHandlerAsync from "../utils/error-handling/errHandlerAsync";
import { isIinteractorReturn } from "../types/generalTypes";
import appErrorHandler from "../utils/error-handling/appErrorHandler";
import userDB from "../data-access/user.db";

function makeCreateUserController(): TExpressCallback {
  return async (req, res, next) => {
    const { username, password } = req.body;
    const createUserDB = {
      saveUser: userDB.saveUser,
    };
    const [result, unHandledErr] = await errHandlerAsync(
      createUserInteractor(username, password, createUserDB),
    );
    if (unHandledErr) {
      appErrorHandler(unHandledErr, req, res, next);
      return;
    } else if (isIinteractorReturn(result)) {
      const { appError, sucessData } = result;
      if (appError === null && sucessData !== null) {
        const { createdUser } = sucessData as { createdUser: any };
        AppResponse.created(res, "User created", createdUser);
        return;
      }
      if (appError instanceof AppError) {
        appErrorHandler(appError, req, res, next);
        return;
      }
    }
  };
}

export { makeCreateUserController };
