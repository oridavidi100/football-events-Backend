import express from 'express';
const { register } = require('../controllers/register');
const router = express.Router();

router.post('/', register);

export default router;
