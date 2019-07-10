import Regex from "../../helper/regex";

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
      firstname,
      lastname,
    } = req.body;

    if (typeof firstname !== 'string' || firstname.length < 1) {
      return res.status(400).json({ error: 'First name is required' });
    }
    if (typeof lastname !== 'string' || lastname.length < 1) {
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
      email
    } = req.body;

    if (typeof email !== 'string' || email.toString().trim() === '' || Regex.emailRegex.test(email) === false) {
      return res.status(400).send({ error: 'Wrong email format' });
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

  if (typeof password !== 'string' || password.toString().trim() === '' || Regex.passwordRegex.test(password) === false) {
        return res.status(400).send({ error: 'Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
      }
      return next();
    }
}

export default AuthValidation;
