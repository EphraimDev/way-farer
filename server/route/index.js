import express from 'express';
import auth from './auth';
import bus from './bus';

const router = express.Router();

router.use('/auth', auth);
router.use('/bus', bus);

export default router;
