import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import Mailer from '../utils/mailer';
import GUID from '../utils/guid';
import upload from '../utils/cloudinary';
import jsonResponse from '../helper/responseHandler';

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

    const findUser = await pool.query(queryHelper.text, [email]);

    if (findUser.rowCount >= 1) {
      return jsonResponse.error(res, 'error', 409, 'User exists already');
    }

    const admin = isAdmin === 'true';
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const img = '';
    const { image } = await AuthController.uploadImage(req, img);

    const userId = GUID.formGuid();
    const newUser = await pool.query(queryHelper.createUser, [userId, email, firstname,
      lastname, hashedPassword, image, admin, moment.createdAt]);

    const token = await Authorization.generateToken(newUser.rows[0]);

    Mailer.createAccountMessage(email);

    const data = {
      token,
      ...newUser.rows[0],
    };

    return jsonResponse.success(res, 'success', 201, data);
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
      return jsonResponse.error(res, 'error', 404, 'User does not exist');
    }


    const verify = await AuthController.verifyPassword(password, findUser.rows[0].password);

    if (verify === true) {
      const token = await Authorization.generateToken(findUser.rows[0]);

      const data = {
        token,
        ...findUser.rows[0],
      };

      return jsonResponse.success(res, 'success', 200, data);
    }

    return jsonResponse.error(res, 'error', 401, 'Email or password incorrect');
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
    const { userId } = req.params;

    const findUser = await pool.query(queryHelper.userId, [userId]);

    if (findUser.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'User does not exist');
    }

    if (userId !== req.user.user_id) {
      return jsonResponse.error(res, 'error', 401, 'User not authorized');
    }

    const {
      firstName, lastName, admin, pass,
    } = await AuthController.bodyParams(req, findUser.rows[0]);

    const { image } = await AuthController.uploadImage(req, findUser.rows[0].img);

    const updatedUser = await pool.query(queryHelper.updateUser,
      [firstName, lastName, pass, image, admin, moment.updatedAt, userId]);

    return jsonResponse.success(res, 'success', 200, updatedUser.rows[0]);
  }

  static async uploadImage(req, image) {
    let img = '';
    if (req.file) {
      await upload(req);
      img = req.body.imageURL !== null || req.body.imageURL !== undefined ? req.body.imageURL
        : image;
    }

    return img;
  }

  static async bodyParams(req, findUser) {
    const {
      firstname, lastname, isAdmin, password,
    } = req.body;

    const firstName = firstname !== undefined ? firstname : findUser.first_name;
    const lastName = lastname !== undefined ? lastname : findUser.last_name;
    const admin = isAdmin !== undefined ? isAdmin : findUser.is_admin;
    const pass = password !== undefined ? await bcrypt.hashSync(password, 10)
      : findUser.password;

    return {
      firstName, lastName, admin, pass,
    };
  }
}

export default AuthController;
