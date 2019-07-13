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
      first_name, last_name, email, password, is_admin,
    } = req.body;

    const findUser = await pool.query(queryHelper.text, [email.toLowerCase()]);

    if (findUser.rowCount >= 1) {
      return jsonResponse.error(res, 'error', 409, 'User exists already');
    }

    const admin = is_admin === 'true';
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const img = '';
    const { image } = await AuthController.uploadImage(req, img);

    const userId = GUID.formGuid();
    
    const newUser = await pool.query(queryHelper.createUser, [userId, email.toLowerCase(), first_name,
      last_name, hashedPassword, image, admin, moment.createdAt]);

    const token = await Authorization.generateToken(newUser.rows[0]);

    Mailer.createAccountMessage(email);

    const data = {
      ...newUser.rows[0],
    };

    return jsonResponse.success(res, 'success', 201, token, data);
  }

  /**
   * Login a user
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async login(req, res) {
    const { email, password } = req.body;
    console.log(email, password)
    const findUser = await pool.query(queryHelper.text, [email.toLowerCase()]);

    if (findUser.rowCount < 1) {
      
      return jsonResponse.error(res, 'error', 404, 'User does not exist');
    }


    const verify = await AuthController.verifyPassword(password, findUser.rows[0].password);

    if (verify === true) {
      const token = await Authorization.generateToken(findUser.rows[0]);

      const data = {
        ...findUser.rows[0],
      };

      return jsonResponse.auth(res, 'success', 200, token, data);
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
    const { user_id } = req.params;

    const findUser = await pool.query(queryHelper.userId, [user_id]);

    if (findUser.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'User does not exist');
    }

    if (user_id !== req.user.user_id) {
      return jsonResponse.error(res, 'error', 401, 'User not authorized');
    }

    const {
      firstname, lastname, admin, pass,
    } = await AuthController.bodyParams(req, findUser.rows[0]);

    const image = await AuthController.uploadImage(req, findUser.rows[0].img);

    const updatedUser = await pool.query(queryHelper.updateUser,
      [firstname, lastname, pass, image, admin, moment.updatedAt, user_id]);

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
      first_name, last_name, is_admin, password,
    } = req.body;

    const firstname = first_name !== undefined ? first_name : findUser.first_name;
    const lastname = last_name !== undefined ? last_name : findUser.last_name;
    const admin = is_admin !== undefined ? is_admin : findUser.is_admin;
    const pass = password !== undefined ? await bcrypt.hashSync(password, 10)
      : findUser.password;

    return {
      firstname, lastname, admin, pass,
    };
  }

  static async allUsers(req, res){
    const users = await pool.query(queryHelper.allUsers, []);

    return jsonResponse.success(res, 'success', 200, users.rows);
  }
}

export default AuthController;
