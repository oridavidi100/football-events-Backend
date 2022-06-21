import { NextFunction, Request, Response } from 'express';
function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err.status) {
    return res.status(500).send({ error: 'internal server error' });
  }
  return res.status(err.status).send({ error: err.message });
}

export default errorHandlerMiddleware;
