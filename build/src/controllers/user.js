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
const User_1 = require("../models/User");
exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.fullName) {
            return res.send(yield User_1.User.find({}));
        }
        const { fullName } = req.params;
        const user = yield User_1.User.findOne({ fullName: { $regex: fullName } });
        if (!user) {
            throw { status: 400, message: 'user not found' };
        }
        else {
            res.send(user);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.changePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPosition } = req.body;
        const user = yield User_1.User.findOneAndUpdate({ email: email }, { position: newPosition });
        return res.send(user);
    }
    catch (err) {
        console.log(err);
    }
});
