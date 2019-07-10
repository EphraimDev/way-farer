import Regex from "../../helper/regex";

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
  static add(req, res, next) {
    const {
      numberPlate,
      manufacturer, model, year, capacity, color, image,
    } = req.body;
    if (typeof numberPlate !== 'string' || Regex.regex.test(numberPlate) === false || numberPlate.toString().trim() === '') {
      return res.status(400).json({ error: 'Number plate accepts only letters and numbers' });
    }
    if (typeof manufacturer !== 'string' || Regex.regex.test(manufacturer) === false || manufacturer.toString().trim() === '') {
      return res.status(400).send({ error: 'Manufacturer accepts only letters' });
    }
    if (typeof model !== 'string' || Regex.regex.test(model) === false || model.toString().trim() === '') {
      return res.status(400).send({ error: 'Model accepts only letters' });
    }
    if (image && (!Regex.imgRegex.test(image) || image.toString().trim() === '')) {
      return res.status(400).send({ error: 'Add a valid image' });
    }
    if (color && (typeof color !== 'string' || Regex.regex.test(color) === false || color.toString().trim() === '')) {
      return res.status(400).send({ error: 'Color accepts only letters' });
    }
    if (typeof year !== 'number') {
      return res.status(400).send({ error: 'Year must be a number' });
    }
    if (year.toString().length !== 4) {
      return res.status(400).send({ error: 'Year must take the format yyyy' });
    }
    if (typeof capacity !== 'number') {
      return res.status(400).send({ error: 'Enter a valid bus capacity greater than 0' });
    }

    return next();
  }
}

export default BusValidation;
