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
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, nameOfPet, newPassword } = req.body;
        const usersArr = yield User_1.User.find({ email: email });
        if (usersArr.length === 0) {
            throw { status: 400, message: 'user does not exist' };
        }
        for (let user of usersArr) {
            if (user.nameOfPet === nameOfPet) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const newPasswordHash = yield bcrypt_1.default.hash(newPassword, salt);
                user.password = newPasswordHash;
                yield user.save();
                return res
                    .status(200)
                    .send({ message: 'password changed', username: user.fullName });
            }
            throw { status: 400, message: 'name of pet not right' };
        }
    }
    catch (error) {
        next(error);
    }
});
