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
  static add(req, res, next) {
    const {
      busId, origin, destination, tripDate, tripTime, fare,
    } = req.body;
    if (typeof busId !== 'number') {
      return res.status(400).json({ error: 'Bus ID is a number' });
    }
    if (typeof origin !== 'string' || origin.toString().trim() === '') {
      return res.status(400).send({ error: 'Origin is a string' });
    }
    if (typeof destination !== 'string' || destination.toString().trim() === '') {
      return res.status(400).send({ error: 'Destination is a string' });
    }
    if (typeof tripDate !== 'string' || tripDate.toString().trim() === '') {
      return res.status(400).send({ error: 'Trip date is a string in format yyyy-mm-dd' });
    }
    if (typeof tripTime !== 'string' || tripTime.toString().trim() === '') {
      return res.status(400).send({ error: 'Trip time is a string in format hh:mm:ss' });
    }
    if (typeof fare !== 'number') {
      return res.status(400).send({ error: 'Fare must be a number' });
    }

    return next();
  }
}

export default TripValidation;
