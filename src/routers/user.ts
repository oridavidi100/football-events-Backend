const { getUser } = require('../controllers/user');
import express from 'express';
const router = express.Router();
const { changePosition } = require('../controllers/user');
router.put('/changposition', changePosition);
router.get('/:fullName', getUser);
router.get('/', getUser);
export default router;
