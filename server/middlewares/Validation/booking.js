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
      trip_id
    } = req.body;
    
    if (!trip_id) {
      return res.status(400).json({ error: 'Trip ID is required' });
    }
    return next();
  }
}

export default BookingValidation;
