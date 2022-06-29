import config from '../config';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const secret = config.secret;
function tokenExtractor(req: Request, res: Response, next: NextFunction) {
  if (req.body.email) {
    next();
  } else {
    const authorization = req.headers['authorization'];
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.body.user = jwt.verify(
          authorization.substring(7),
          secret as string
        );
        next();
      } catch {
        throw { status: 401, message: 'token invalid' };
      }
    }
    if (!req.body.email && !authorization)
      throw { status: 401, message: 'token missing' };
  }
}
export default tokenExtractor;
