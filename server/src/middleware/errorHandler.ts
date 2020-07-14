import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/Logger';

const log = new Logger(__filename);

type CustomErrorHandler = {
  statusCode: number;
  message: number;
  toString: () => string;
};

const handleErrors = (
  error: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  log.error(error.toString());
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({ error: error.message });
};

export default handleErrors;
