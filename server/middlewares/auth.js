import jwt from 'jsonwebtoken';
import config from '../config/db';
import pool from '../model/db';
import query from '../helper/query';
import jsonResponse from '../helper/responseHandler';

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
  static async generateToken(user) {
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
  static async authorize(req, res, next) {
    try {
      //const token = await req.headers.token.split(' ')[1];
      const {authorization} = req.headers;
      const token = authorization.split(' ')[1];
      
      const decoded = await jwt.verify(token, secret);

      const foundUser = await pool.query(query.text, [decoded.email]);

      [req.user] = foundUser.rows;
      console.log(req.user)
      if (req.user === undefined) {
        return jsonResponse.error(res, 'error', 401, 'Token is invalid');
      }

      return next();
    } catch (err) {
      return jsonResponse.error(res, 'error', 401, 'Token is invalid or not provided');
    }
  }

  /**
   * Authorize user
   * @method checkAdmin
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static async checkAdmin(req, res, next) {
    if (req.user.is_admin !== true) {
      return jsonResponse.error(res, 'error', 401, 'Admin access only');
    }

    return next();
  }
}

export default Authorization;
