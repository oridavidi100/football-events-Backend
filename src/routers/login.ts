import express from 'express';
const { login } = require('../controllers/login');
const router = express.Router();
const { forgetPassword } = require('../controllers/forgetPassword');

router.post('/forgetPassword', forgetPassword);
router.post('/', login);
export default router;
