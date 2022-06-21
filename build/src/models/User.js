"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    nameOfPet: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
}, { timestamps: true });
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
