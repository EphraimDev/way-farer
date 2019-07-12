import express from 'express';
import validate from '../middlewares/Validation/trip';
import trips from '../controller/trip';
import authorization from '../middlewares/auth';

const router = express.Router();

router.post('/', authorization.authorize, authorization.checkAdmin, validate.places, validate.money, validate.datetime, validate.bus, trips.addTrip);
router.delete('/:tripId', authorization.authorize, authorization.checkAdmin, trips.cancelTrip);
router.get('/', trips.getAllTrips);
router.get('/search?', trips.searchTrips);

export default router;
