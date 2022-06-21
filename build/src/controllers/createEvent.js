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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../models/Event");
const nanoid_1 = require("nanoid");
const Messages_1 = require("../models/Messages");
const config_1 = __importDefault(require("../config"));
const { cloudinary } = config_1.default;
exports.createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield Event_1.Event.deleteMany({
            date: { $lt: new Date() },
        });
        const event = yield Event_1.Event.create({
            _id: (0, nanoid_1.nanoid)(),
            location,
            Players: players,
            date,
            creator: { fullName: user.fullName, id: user.id },
            img: imgSrc,
            adress,
            balls: [],
        });
        res.send(event);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.Event.find()
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
    }
    catch (error) {
        next(error);
    }
});
exports.ball = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.body;
        const { user } = req.body;
        const event = yield Event_1.Event.findById(eventId);
        const balls = event.balls;
        if (balls.includes(user.id)) {
            var ballIndex = balls.indexOf(user.id);
            balls.splice(ballIndex, 1);
            event.balls = balls;
            yield event.save();
            res.status(200).send(event);
        }
        else {
            balls.push(user.id);
            event.balls = balls;
            yield event.save();
            res.status(200).send(event);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.body;
        const { user } = req.body;
        const event = yield Event_1.Event.findById(eventId);
        if (event && event.creator.fullName === user.fullName) {
            if (event.Players.length === 0) {
                event.remove();
                yield Messages_1.Message.remove({ room: eventId });
                res.status(200).send(event);
            }
            else {
                throw { status: 400, message: 'there is players in the game' };
            }
        }
        else {
            throw { status: 400, message: 'you are not the creator of this event' };
        }
    }
    catch (error) {
        next(error);
    }
});
