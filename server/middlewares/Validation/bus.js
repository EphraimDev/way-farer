/**
 * @exports
 * @class BusValidation
 */
class BusValidation {
  /**
          * Validate sign up input
          *
          * @staticmethod
          * @param  {object} req - Request object
          * @param {object} res - Response object
          * @param {function} next - middleware next (for error handling)
          * @return {json} res.json
          */
  static add(req, res, next) {
    const regex = /^[a-z0-9]+$/i;
    const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;

    const {
      numberPlate,
      manufacturer, model, year, capacity, color, image,
    } = req.body;
    if (typeof numberPlate !== 'string' || regex.test(numberPlate) === false || numberPlate.toString().trim() === '') {
      return res.status(400).json({ error: 'Number plate accepts only letters and numbers' });
    }
    if (typeof manufacturer !== 'string' || regex.test(manufacturer) === false || manufacturer.toString().trim() === '') {
      return res.status(400).send({ error: 'Manufacturer accepts only letters' });
    }
    if (typeof model !== 'string' || regex.test(model) === false || model.toString().trim() === '') {
      return res.status(400).send({ error: 'Model accepts only letters' });
    }
    if (image && (!imgRegex.test(image) || image.toString().trim() === '')) {
      return res.status(400).send({ error: 'Add a valid image' });
    }
    if (color && (typeof color !== 'string' || regex.test(color) === false || color.toString().trim() === '')) {
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
