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
  static validateSignUp(req, res, next) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const regex = /^[a-zA-Z- ]+( [a-zA-Z- ]+)*$/i;
    const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
      firstname,
      lastname,
      email,
      password,
      isAdmin,
      img,
    } = req.body;
    if (typeof firstname !== 'string' || firstname.length < 1 || regex.test(firstname) === false) {
      return res.status(400).json({ error: 'First name should only contain letters' });
    }
    else if (typeof lastname !== 'string' || lastname.length < 1 || regex.test(lastname) === false) {
      return res.status(400).json({ error: 'Last name should only contain letters' });
    }
    else if (typeof email !== 'string' || email.toString().trim() === '' || emailRegex.test(email) === false) {
      return res.status(400).send({ error: 'Wrong email format' });
    }
    else if (typeof password !== 'string' || password.toString().trim() === '' || passwordRegex.test(password) === false) {
      return res.status(400).send({ error: 'Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
    }
    else if (img && (!imgRegex.test(img) || img.toString().trim() === '')) {
      return res.status(400).send({ error: 'Add a valid image' });
    }
    else if (isAdmin && (isAdmin === true)) {
      next();
    }
    else if (isAdmin && (isAdmin === false)) {
      next();
    }
    else if(!isAdmin && !img){
      next()
    }
    else{
      return res.status(400).send({ error: 'Admin should be a boolean' });
    }
  }
}

export default AuthValidation;
