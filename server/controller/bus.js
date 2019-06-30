import bcrypt from 'bcrypt';
import Authorization from '../middlewares/auth';
import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import Mailer from '../utils/mailer';

/**
 * @exports
 * @class BusController
 */
class BusController {
  constructor() {
    this.bus = this.addBus;
  }

  /**
   * Add a new bus to the database
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  async signup(req, res) {
    const {
      firstname, lastname, email, password, image, isAdmin,
    } = req.body;


    const findUser = await pool.query(queryHelper.text, [email]);

    // console.log(findUser)
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
}

const busController = new BusController();

export default busController;
