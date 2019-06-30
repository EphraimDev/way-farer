import jwt from 'jsonwebtoken';
import config from '../config/db';
import pool from '../model/db';

const secret = config.jwtSecret;

/**
 * @exports
 * @class Authorization
 */
class Authorization {
  constructor() {
    this.authenticate = this.authorize;
  }

  /**
   * @method generateToken
   * @memberof Authorization
   * @param {object} user
   * @returns {string} token
   * expires in 48 hours
   */
  async generateToken(user) {
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        password: user.password,
        admin: user.is_admin,
      },
      secret,
      {
        expiresIn: '48h',
      },
    );
    
    return token;
  }

  /**
   * Authorize user
   * @method authorize
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  async authorize(req, res, next) {
    try {
      const token = await req.headers.Authorization.split(' ')[1];
      const decoded = await jwt.verify(token, secret);
      const text = `SELECT * FROM users where email = '${decoded.email}'`;
      const foundUser = await pool.query(text);
      req.user = decoded;
      req.userId = foundUser.id;
      this.user = req.user;

      return next();
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        error: 'Token is invalid or not provided',
      });
    }
  }
}
const authorization = new Authorization();
export default authorization;
