"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { login } = require('../controllers/login');
const router = express_1.default.Router();
const { forgetPassword } = require('../controllers/forgetPassword');
router.post('/forgetPassword', forgetPassword);
router.post('/', login);
exports.default = router;
