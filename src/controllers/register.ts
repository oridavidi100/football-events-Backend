import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
exports.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, fullName, nameOfPet, position } = req.body;
    let { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const usersArr = await User.find({ email: email });
    if (usersArr.length > 0) {
      throw { status: 400, message: 'user already exist' };
    }
    if (!validateEmail(email)) {
      throw { status: 400, message: 'email is not valid' };
    }
    const user = await User.create({
      _id: nanoid(),
      email,
      password,
      fullName,
      nameOfPet,
      position,
    });
    res.status(201).send('Register Success' + user);
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

function validateEmail(emailAdress: string): boolean {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}
