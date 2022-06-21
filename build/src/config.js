"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cloudinary_1 = __importDefault(require("cloudinary"));
// const MONGO_URL = process.env.MONGO_URL;
const secret = process.env.SECRET_KEY;
const MONGO_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URL;
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure_distribution: 'api - eu.cloudinary.com',
// });
exports.default = { secret, MONGO_URL, cloudinary: cloudinary_1.default };
