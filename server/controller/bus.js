import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import guid from '../utils/guid';
import upload from '../utils/cloudinary';
import jsonResponse from '../helper/responseHandler';

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
      numberPlate, manufacturer, model, year, capacity, color,
    } = req.body;

    const busId = guid.formGuid();

    if (req.user.is_admin !== true) {
      return jsonResponse.error(res, 'error', 401, 'Admin access only');
    }

    const findBus = await pool.query(queryHelper.getBus, [numberPlate]);

    if (findBus.rowCount >= 1) {
      return jsonResponse.error(res, 'error', 409, 'A bus with same plate number already exists');
    }

    if (req.file) {
      await upload(req);
    }

    const img = !req.body.imageURL ? '' : req.body.imageURL;

    const newBus = await pool.query(queryHelper.addBus,
      [busId, req.user.user_id, numberPlate, manufacturer,
        model, year, capacity, color, img, moment.createdAt]);

    return jsonResponse.success(res, 'success', 201, newBus.rows[0]);
  }
}

export default BusController;
