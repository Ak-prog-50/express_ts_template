import AppError from "../utils/error-handling/AppErrror";

type TRequestProperty = string | undefined;
type TInteractorReturn = AppError | null;

function isTInteractorReturn(value: any): value is TInteractorReturn {
  return value === null || value instanceof AppError;
}

export { TRequestProperty, TInteractorReturn, isTInteractorReturn };
