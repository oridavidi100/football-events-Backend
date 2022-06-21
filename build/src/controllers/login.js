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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.secret;
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.user) {
            return res.send(req.body.user);
        }
        const body = {};
        const { password, email } = req.body;
        const usersArr = yield User_1.User.find({ email: email });
        for (let user of usersArr) {
            let ans = yield bcrypt_1.default.compare(password, user.password);
            if (ans === true) {
                body.email = user.email;
                body.fullName = user.fullName;
                body.id = user._id;
                body.position = user.position;
                const accessToken = jsonwebtoken_1.default.sign(body, secret);
                return res.send({ body, accessToken });
            }
        }
        if (usersArr.length > 0) {
            throw { status: 400, message: 'password incorrect' };
        }
        throw { status: 400, message: 'user not exist' };
    }
    catch (error) {
        next(error);
    }
});
