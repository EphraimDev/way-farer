/**
 * @exports
 * @class BusValidation
 */
class BusValidation {
  /**
          * @staticmethod
          * @param  {object} req - Request object
          * @param {object} res - Response object
          * @param {function} next - middleware next (for error handling)
          * @return {json} res.json
          */
  static company(req, res, next) {
    const { manufacturer, model } = req.body;

    if (!manufacturer) {
      return res.status(400).send({ error: 'Manufacturer is missing' });
    }
    if (!model) {
      return res.status(400).send({ error: 'Model of bus is missing' });
    }
    return next();
  }

  static physicalProps(req, res, next) {
    const { number_plate, capacity } = req.body;


    if (!number_plate) {
      return res.status(400).json({ error: 'Number plate is missing' });
    }
    if (!capacity) {
      return res.status(400).send({ error: 'Bus capacity is missing' });
    }
    return next();
  }

  static year(req, res, next) {
    const { year } = req.body;

    if (!year) {
      return res.status(400).send({ error: 'Year of bus is missing' });
    }
    return next();
  }
}

export default BusValidation;
