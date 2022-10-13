export enum NODE_ENVS {
  dev = "dev",
  prod = "prod",
}

export const GET_DB_URL = (): string => {
  const { NODE_ENV, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (NODE_ENV === NODE_ENVS.prod) {
    return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wdk122r.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  } else {
    return "mongodb://localhost:27017/jetzi_local_db";
  }
};

export const winston_format = (publicAddress: string, msg: string): string =>
  `publicAddress => ${publicAddress} *msg: ${msg}`;
