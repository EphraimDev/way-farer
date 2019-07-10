import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import Mailer from '../utils/mailer';
import GUID from '../utils/guid';
import upload from '../utils/cloudinary';

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
      firstname, lastname, email, password, isAdmin,
    } = req.body;

    if (req.file) {
      await upload(req);
    }


    const userId = GUID.formGuid();

    const findUser = await pool.query(queryHelper.text, [email]);

    if (findUser.rowCount >= 1) {
      return res.status(409).json({
        status: 'error',
        error: 'User exists already',
      });
    }

    const admin = isAdmin === 'true';
    const img = !req.body.imageURL ? '' : req.body.imageURL;
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await pool.query(queryHelper.createUser, [userId, email, firstname,
      lastname, hashedPassword, img, admin, moment.createdAt]);

    // const newUser = await pool.query(queryHelper.text, [email]);

    const token = await Authorization.generateToken(newUser.rows[0]);

    Mailer.createAccountMessage(email);

    return res.status(201).json({
      status: 'success',
      data: {
        token,
        ...newUser.rows[0],
      },
    });
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
          ...findUser.rows[0],
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

  /**
   * Update user profile
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async updateProfile(req, res) {
    const {
      firstname, lastname, isAdmin, password,
    } = req.body;

    const { userId } = req.params;

    const findUser = await pool.query(queryHelper.userId, [userId]);

    if (findUser.rowCount < 1) {
      return res.status(404).json({
        status: 'error',
        error: 'User does not exist',
      });
    }

    if (userId !== req.user.user_id) {
      return res.status(401).json({
        status: 'error',
        error: 'User not authorized',
      });
    }

    const firstName = firstname !== undefined ? firstname : findUser.rows[0].first_name;
    const lastName = lastname !== undefined ? lastname : findUser.rows[0].last_name;
    const admin = isAdmin !== undefined ? isAdmin : findUser.rows[0].is_admin;
    const pass = password !== undefined ? await bcrypt.hashSync(password, 10)
      : findUser.rows[0].password;

    let image = findUser.rows[0].img;
    if (req.file) {
      await upload(req);
      image = req.body.imageURL;
    }

    const updatedUser = await pool.query(queryHelper.updateUser,
      [firstName, lastName, pass, image, admin, moment.updatedAt, userId]);

    return res.status(200).json({
      status: 'success',
      data: updatedUser.rows[0],
    });
  }
}

export default AuthController;
