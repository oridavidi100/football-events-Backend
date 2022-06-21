"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { getUser } = require('../controllers/user');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { changePosition } = require('../controllers/user');
router.put('/changposition', changePosition);
router.get('/:fullName', getUser);
router.get('/', getUser);
exports.default = router;
