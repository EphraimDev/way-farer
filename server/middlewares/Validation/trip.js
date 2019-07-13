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

    if (bus_id.length < 1 || typeof bus_id !== 'string') {
      return res.status(400).json({ error: 'Bus ID is a string' });
    }

    return next();
  }

  static places(req, res, next) {
    const {
      origin, destination,
    } = req.body;

    if (typeof origin !== 'string' || origin.toString().trim() === '') {
      return res.status(400).send({ error: 'Origin is a string' });
    }
    if (typeof destination !== 'string' || destination.toString().trim() === '') {
      return res.status(400).send({ error: 'Destination is a string' });
    }

    return next();
  }

  static money(req, res, next) {
    const {
      fare,
    } = req.body;

    if (typeof fare !== 'number') {
      return res.status(400).send({ error: 'Fare must be a number' });
    }

    return next();
  }

  static datetime(req, res, next) {
    const {
      trip_date, trip_time,
    } = req.body;

    if (typeof trip_date !== 'string' || trip_date.toString().trim() === '') {
      return res.status(400).send({ error: 'Trip date is a string in format yyyy-mm-dd' });
    }
    // if (typeof trip_time !== 'string' || trip_time.toString().trim() === '') {
    //   return res.status(400).send({ error: 'Trip time is a string in format hh:mm:ss' });
    // }

    return next();
  }
}

export default TripValidation;
