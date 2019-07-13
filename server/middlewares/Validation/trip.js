/**
 * @exports
 * @class TripValidation
 */
class TripValidation {
  /**
            * Validate add trip input
            *
            * @staticmethod
            * @param  {object} req - Request object
            * @param {object} res - Response object
            * @param {function} next - middleware next (for error handling)
            * @return {json} res.json
            */
  static bus(req, res, next) {
    const {
      bus_id,
    } = req.body;

    if (!bus_id) {
      return res.status(400).json({ error: 'Bus ID is required' });
    }

    return next();
  }

  static places(req, res, next) {
    const {
      origin, destination,
    } = req.body;

    if (!origin) {
      return res.status(400).send({ error: 'Origin is required' });
    }
    if (!destination) {
      return res.status(400).send({ error: 'Destination is required' });
    }

    return next();
  }

  static money(req, res, next) {
    const {
      fare,
    } = req.body;

    if (!fare) {
      return res.status(400).send({ error: 'Fare is required' });
    }

    return next();
  }

  static datetime(req, res, next) {
    const {
      trip_date, trip_time,
    } = req.body;

    if (!trip_date) {
      return res.status(400).send({ error: 'Trip date is required' });
    }
    // if (typeof trip_time !== 'string' || trip_time.toString().trim() === '') {
    //   return res.status(400).send({ error: 'Trip time is a string in format hh:mm:ss' });
    // }

    return next();
  }
}

export default TripValidation;
