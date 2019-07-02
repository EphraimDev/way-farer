import express from 'express';
import auth from './auth';
import bus from './bus';
import trip from './trip';

const router = express.Router();

router.use('/auth', auth);
router.use('/bus', bus);
router.use('/trips', trip);

export default router;
