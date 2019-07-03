import express from 'express';
import auth from './auth';
import bus from './bus';
import trip from './trip';
import book from './booking';

const router = express.Router();

router.use('/auth', auth);
router.use('/bus', bus);
router.use('/trips', trip);
router.use('/bookings', book);

export default router;
