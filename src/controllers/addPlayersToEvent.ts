import { Event } from '../models/Event';
import { NextFunction, Request, Response } from 'express';

exports.addplayersToEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.body;
  const { user } = req.body;
  const event: any = await Event.findById(eventId);
  const players = event.Players;
  if (players.includes(user.id)) {
    var playerIndex = players.indexOf(user.id);
    players.splice(playerIndex, 1);
    event.Players = players;
    await event.save();
    res.status(200).send({ event, message: 'seccess', button: 'join' });
  } else {
    players.push(user.id);
    event.Players = players;
    await event.save();
    res.status(200).send({ event, message: 'seccess', button: 'remove' });
  }
};
