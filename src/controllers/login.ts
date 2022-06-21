import bcrypt from 'bcrypt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import { NextFunction, raw, Request, Response } from 'express';
interface Body {
  email: string;
  name: string;
}
const secret = config.secret;
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.user) {
      return res.send(req.body.user);
    }
    const body: Body | any = {};
    const { password, email } = req.body;
    const usersArr = await User.find({ email: email });
    for (let user of usersArr) {
      let ans = await bcrypt.compare(password, user.password);
      if (ans === true) {
        body.email = user.email;
        body.fullName = user.fullName;
        body.id = user._id;
        body.position = user.position;
        const accessToken = jwt.sign(body, secret as string);
        return res.send({ body, accessToken });
      }
    }
    if (usersArr.length > 0) {
      throw { status: 400, message: 'password incorrect' };
    }
    throw { status: 400, message: 'user not exist' };
  } catch (error) {
    next(error);
  }
};
