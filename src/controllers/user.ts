import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.fullName) {
      return res.send(await User.find({}));
    }
    const { fullName } = req.params;
    const user = await User.findOne({ fullName: { $regex: fullName } });
    if (!user) {
      throw { status: 400, message: 'user not found' };
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

exports.changePosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPosition } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      { position: newPosition }
    );
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
};
