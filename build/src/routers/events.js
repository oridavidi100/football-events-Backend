"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createEvent } = require('../controllers/createEvent');
const express_1 = __importDefault(require("express"));
const { addplayersToEvent } = require('../controllers/addPlayersToEvent');
const { ball } = require('../controllers/createEvent');
const { deleteEvent } = require('../controllers/createEvent');
const router = express_1.default.Router();
router.delete('/deleteEvent', deleteEvent);
router.post('/giveBall', ball);
router.post('/create', createEvent);
router.post('/addPlayer', addplayersToEvent);
exports.default = router;
