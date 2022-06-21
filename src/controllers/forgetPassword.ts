import { User } from '../models/User';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
exports.forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, nameOfPet, newPassword } = req.body;
    const usersArr = await User.find({ email: email });
    if (usersArr.length === 0) {
      throw { status: 400, message: 'user  not exist' };
    }
    for (let user of usersArr) {
      if (user.nameOfPet === nameOfPet) {
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
        user.password = newPasswordHash;
        await user.save();
        return res
          .status(200)
          .send({ message: 'password changed', username: user.fullName });
      }
      throw { status: 400, message: 'wrong name of pet' };
    }
  } catch (error) {
    next(error);
  }
};
