import express from 'express';
import validate from '../middlewares/Validation/trip';
import trips from '../controller/trip';
import authorization from '../middlewares/auth';

const router = express.Router();

router.post('/', authorization.authorize, validate.add, trips.addTrip);

export default router;
