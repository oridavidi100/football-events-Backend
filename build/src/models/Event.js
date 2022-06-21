"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    location: {
        type: String,
        required: true,
    },
    Players: [
        {
            type: mongoose_1.default.Schema.Types.String,
            ref: 'User',
        },
    ],
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Object,
        required: true,
    },
    img: {
        type: String,
    },
    adress: {
        type: String,
        required: true,
    },
    balls: [
        {
            type: mongoose_1.default.Schema.Types.String,
            ref: 'User',
        },
    ],
}, { timestamps: true });
const Event = mongoose_1.default.model('Event', EventSchema);
exports.Event = Event;
