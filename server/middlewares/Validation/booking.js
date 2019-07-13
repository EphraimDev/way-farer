/**
 * @exports
 * @class BookingValidation
 */
class BookingValidation {
  /**
              * Validate book trip input
              *
              * @staticmethod
              * @param  {object} req - Request object
              * @param {object} res - Response object
              * @param {function} next - middleware next (for error handling)
              * @return {json} res.json
              */
  static book(req, res, next) {
    const {
      trip_id, seat,
    } = req.body;
    if (!trip_id) {
      return res.status(400).json({ error: 'Trip ID is required' });
    }
    if (seat && typeof seat !== 'number') {
      return res.status(400).json({ error: 'Seat is a number' });
    }
    return next();
  }
}

export default BookingValidation;
