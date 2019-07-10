import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import guid from '../utils/guid';
import upload from '../utils/cloudinary';

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
   * @method addBus
   * @memberof BusController
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async addBus(req, res) {
    const {
      numberPlate, manufacturer, model, year, capacity, color, image,
    } = req.body;

    const busId = guid.formGuid();

    if (req.user.is_admin !== true) {
      return res.status(401).json({
        status: 'error',
        error: 'Admin access only',
      });
    }

    const findBus = await pool.query(queryHelper.getBus, [numberPlate]);

    if (findBus.rowCount >= 1) {
      return res.status(409).json({
        status: 'error',
        error: 'A bus with same plate number already exists',
      });
    }

    if (req.file) {
      await upload(req);
    }

    const img = !req.body.imageURL ? '' : req.body.imageURL;;

    const newBus = await pool.query(queryHelper.addBus,
      [busId, req.user.user_id, numberPlate, manufacturer,
        model, year, capacity, color, img, moment.createdAt]);

    return res.status(201).json({
      status: 'success',
      data: newBus.rows[0],
    });
  }
}

export default BusController;
