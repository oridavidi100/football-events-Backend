import { Message } from '../models/Messages';
import { NextFunction, Request, Response } from 'express';
exports.getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room: room });
    res.send(messages);
  } catch (error) {
    next(error);
  }
};
