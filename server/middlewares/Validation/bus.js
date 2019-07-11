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
    const { manufacturer, model, year} = req.body;

    if (manufacturer.toString().trim() === '') {
      return res.status(400).send({ error: 'Manufacturer is missing' });
    }
    if (model.toString().trim() === '') {
      return res.status(400).send({ error: 'Model of bus is missing' });
    }
    if (Number(year).toString() === "NaN") {
      return res.status(400).send({ error: 'Year must be a number' });
    }
    if (year.toString().length !== 4) {
      return res.status(400).send({ error: 'Year must take the format yyyy' });
    }
    return next();
  }

  static physicalProps(req,res,next){
    const {numberPlate, capacity} = req.body;

    
    if (numberPlate.toString().trim() === '') {
      return res.status(400).json({ error: 'Number plate is missing' });
    }
    if (Number(capacity) > 0 === false) {
      return res.status(400).send({ error: 'Enter a valid bus capacity greater than 0' });
    }
    return next();
  }

  static year(req, res, next) {
    const { year} = req.body;

    if (Number(year).toString() === "NaN") {
      return res.status(400).send({ error: 'Year must be a number' });
    }
    if (year.toString().length !== 4) {
      return res.status(400).send({ error: 'Year must take the format yyyy' });
    }
    return next();
  }
}

export default BusValidation;
