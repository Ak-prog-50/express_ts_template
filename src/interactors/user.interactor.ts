import { TInteractorReturn, TRequestProperty } from "../types/generalTypes";
import AppError from "../utils/error-handling/AppErrror";

interface ICreateUserDB {
  saveUser(): void;
}

async function createUser(
  username: TRequestProperty,
  password: TRequestProperty,
  createUserDB: ICreateUserDB,
): Promise<TInteractorReturn> {
  return null;
}

export { createUser };
