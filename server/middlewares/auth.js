import jwt from 'jsonwebtoken';
import config from '../config/db';
import pool from '../model/db';
import query from '../helper/query';

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
        userId: user.user_id,
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
      const token = await req.headers.authorization.split(' ')[1];

      const decoded = await jwt.verify(token, secret);

      const foundUser = await pool.query(query.text, [decoded.email]);

      [req.user] = foundUser.rows;

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
