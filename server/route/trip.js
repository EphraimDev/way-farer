import express from 'express';
import validate from '../middlewares/Validation/trip';
import trips from '../controller/trip';
import authorization from '../middlewares/auth';
import {updateStatus} from '../middlewares/Validation/status';

const router = express.Router();

router.post('/', authorization.authorize, validate.places, validate.money, validate.datetime, validate.bus, trips.addTrip);
router.delete('/:trip_id', authorization.authorize, trips.cancelTrip);
router.get('/', authorization.authorize, trips.getAllTrips);
router.get('/search?', authorization.authorize, trips.searchTrips);
router.patch('/:trip_id', authorization.authorize, updateStatus, trips.updateTrip);

export default router;
