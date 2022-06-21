"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../models/Event");
exports.addplayersToEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.body;
    const { user } = req.body;
    const event = yield Event_1.Event.findById(eventId);
    const players = event.Players;
    if (players.includes(user.id)) {
        var playerIndex = players.indexOf(user.id);
        players.splice(playerIndex, 1);
        event.Players = players;
        yield event.save();
        res.status(200).send({ event, message: 'seccess', button: 'join' });
    }
    else {
        players.push(user.id);
        event.Players = players;
        yield event.save();
        res.status(200).send({ event, message: 'seccess', button: 'remove' });
    }
});
