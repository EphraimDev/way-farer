import Regex from '../../helper/regex';

/**
 * @exports
 * @class AuthValidation
 */
class AuthValidation {
  /**
        * Validate sign up input
        *
        * @staticmethod
        * @param  {object} req - Request object
        * @param {object} res - Response object
        * @param {function} next - middleware next (for error handling)
        * @return {json} res.json
        */
  static validateNames(req, res, next) {
    const {
      first_name,
      last_name,
    } = req.body;

    if (!first_name) {
      return res.status(400).json({ error: 'First name is required' });
    }
    if (!last_name) {
      return res.status(400).json({ error: 'Last name is required' });
    }

    return next();
  }

  /**
      * Validate Email
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validateEmail(req, res, next) {
    const {
      email,
    } = req.body;

    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    return next();
  }


  /**
      * Validate Password
      *
      * @staticmethod
      * @param  {object} req - Request object
      * @param {object} res - Response object
      * @param {function} next - middleware next (for error handling)
      * @return {json} res.json
      */
  static validatePassword(req, res, next) {
    const {
      password,
    } = req.body;

    if (!password) {
      return res.status(400).send({ error: 'Password is required' });
    }
    return next();
  }
}

export default AuthValidation;
