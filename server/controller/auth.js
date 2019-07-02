import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import Mailer from '../utils/mailer';

/**
 * @exports
 * @class AuthController
 */
class AuthController {
  /**
   * Creates a new user
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async signup(req, res) {
    const {
      firstname, lastname, email, password, image, isAdmin,
    } = req.body;


    const findUser = await pool.query(queryHelper.text, [email]);

    if (findUser.rowCount >= 1) {
      return res.status(409).json({
        status: 'error',
        error: 'User exists already',
      });
    }

    try {
      const admin = !isAdmin ? false : isAdmin;
      const img = !image ? '' : image;
      const hashedPassword = await bcrypt.hashSync(password, 10);

      await pool.query(queryHelper.createUser,
        [email, firstname, lastname, hashedPassword, img, admin, moment.createdAt]);

      const newUser = await pool.query(queryHelper.text, [email]);

      const token = await Authorization.generateToken(newUser.rows[0]);

      Mailer.createAccountMessage(email);

      return res.status(201).json({
        status: 'success',
        data: {
          token,
          firstname: newUser.rows[0].first_name,
          lastname: newUser.rows[0].last_name,
          email: newUser.rows[0].email,
          id: newUser.rows[0].id,
          image: newUser.rows[0].img,
          isAdmin: newUser.rows[0].is_admin,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Network failure',
      });
    }
  }

  /**
   * Login a user
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async login(req, res) {
    const { email, password } = req.body;

    const findUser = await pool.query(queryHelper.text, [email]);

    if (findUser.rowCount < 1) {
      return res.status(404).json({
        status: 'error',
        error: 'User does not exist',
      });
    }


    const verify = await AuthController.verifyPassword(password, findUser.rows[0].password);

    if (verify === true) {
      const token = await Authorization.generateToken(findUser.rows[0]);

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          firstname: findUser.rows[0].first_name,
          lastname: findUser.rows[0].last_name,
          email: findUser.rows[0].email,
          id: findUser.rows[0].id,
          image: findUser.rows[0].img,
          isAdmin: findUser.rows[0].is_admin,
        },
      });
    }
    return res.status(401).json({
      status: 'error',
      error: 'Email or password incorrect',
    });
  }

  /**
   * @method verifyPassword
   * @memberof Users
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

export default AuthController;
