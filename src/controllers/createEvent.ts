import { Event } from '../models/Event';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { nanoid } from 'nanoid';
import { Message } from '../models/Messages';
import config from '../config';
const { cloudinary } = config;

exports.createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { image } = req.body;
    // console.log(image);
    // const uploadedResponse = await cloudinary.v2.uploader.upload(image);

    const { location, date, imgSrc, adress } = req.body;
    if (!location || !date) {
      throw { status: 400, message: 'missing fields' };
    }
    const user = req.body.user;
    const players = [];
    players.push(user.id);
    await Event.deleteMany({
      date: { $lt: new Date() },
    });
    const event = await Event.create({
      _id: nanoid(),
      location,
      Players: players,
      date,
      creator: { fullName: user.fullName, id: user.id },
      img: imgSrc,
      adress,
      balls: [],
    });
    res.send(event);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find()
      .populate({
        path: 'Players',
        model: 'User',
        select: { fullName: 1, email: 1, position: 1 },
      })
      .populate({
        path: 'balls',
        model: 'User',
        select: { fullName: 1 },
      });
    res.send(events);
  } catch (error) {
    next(error);
  }
};

exports.ball = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.body;
    const { user } = req.body;
    const event: any = await Event.findById(eventId);
    const balls = event.balls;
    if (balls.includes(user.id)) {
      var ballIndex = balls.indexOf(user.id);
      balls.splice(ballIndex, 1);
      event.balls = balls;
      await event.save();
      res.status(200).send(event);
    } else {
      balls.push(user.id);
      event.balls = balls;
      await event.save();
      res.status(200).send(event);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.body;
    const { user } = req.body;
    const event = await Event.findById(eventId);
    if (event && event.creator.fullName === user.fullName) {
      if (event.Players.length === 0) {
        event.remove();
        await Message.remove({ room: eventId });
        res.status(200).send(event);
      } else {
        throw { status: 400, message: 'there is players in the game' };
      }
    } else {
      throw { status: 400, message: 'you are not the creator of this event' };
    }
  } catch (error) {
    next(error);
  }
};
