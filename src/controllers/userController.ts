import { createUser as createUserInteractor } from "../interactors/user.interactor";
import { TExpressCallback } from "../types/expressTypes";
import AppResponse from "../utils/AppResponse";
import AppError from "../utils/error-handling/AppErrror";
import errHandlerAsync from "../utils/error-handling/errHandlerAsync";
import { IinteractorReturn, isIinteractorReturn } from "../types/generalTypes";
import appErrorHandler from "../utils/error-handling/appErrorHandler";
import { saveUser } from "../data-access/user.db";
import { validateStrings } from "../utils/validateReqProperties";
import { IUserDocument } from "../data-access/models/userModel";

function makeCreateUserController(): TExpressCallback {
  return async (req, res, next) => {
    let { username, password, email } = req.body;
    const inputStrings: (string | undefined)[] = [username, password, email];
    if (!validateStrings(inputStrings)) {
      AppError.badRequest("Invalid request");
      return;
    }
    [username, password, email] = inputStrings;

    const createUserDB = {
      saveUser,
    };
    const [result, unHandledErr] = await errHandlerAsync<IinteractorReturn<IUserDocument>>(
      createUserInteractor(username, password, email, createUserDB),
    );
    if (unHandledErr) {
      appErrorHandler(unHandledErr, req, res, next);
      return;
    } else if (isIinteractorReturn(result)) {
      const { appError, sucessData: createdUser } = result;
      if (appError === null && createdUser !== null) {
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
