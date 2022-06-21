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
const nanoid_1 = require("nanoid");
exports.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullName, nameOfPet, position } = req.body;
        let { password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        password = yield bcrypt_1.default.hash(password, salt);
        const usersArr = yield User_1.User.find({ email: email });
        if (usersArr.length > 0) {
            throw { status: 400, message: 'user already exist' };
        }
        if (!validateEmail(email)) {
            throw { status: 400, message: 'email is not valid' };
        }
        const user = yield User_1.User.create({
            _id: (0, nanoid_1.nanoid)(),
            email,
            password,
            fullName,
            nameOfPet,
            position,
        });
        res.status(201).send('Register Success' + user);
        next();
    }
    catch (error) {
        // console.log(error);
        next(error);
    }
});
function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    }
    else {
        return false;
    }
}
