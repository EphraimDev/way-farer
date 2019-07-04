import express from 'express';
import validate from '../middlewares/Validation/booking';
import booking from '../controller/booking';
import authorization from '../middlewares/auth';

const router = express.Router();

router.post('/', authorization.authorize, validate.book, booking.bookTrip);
router.get('/', authorization.authorize, booking.getAllBookings);
router.delete('/:bookingId', authorization.authorize, booking.deleteBooking);

export default router;
