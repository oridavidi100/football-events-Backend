"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = config_1.default.secret;
function tokenExtractor(req, res, next) {
    if (req.body.email) {
        next();
    }
    else {
        const authorization = req.headers['authorization'];
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            try {
                req.body.user = jsonwebtoken_1.default.verify(authorization.substring(7), secret);
                next();
            }
            catch (_a) {
                throw { status: 401, message: 'token invalid' };
            }
        }
        if (!req.body.email && !authorization)
            throw { status: 401, message: 'token missing' };
    }
}
exports.default = tokenExtractor;
