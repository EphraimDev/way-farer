import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';

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
  async addBus(req, res) {
    const {
      numberPlate, manufacturer, model, year, capacity, color, image,
    } = req.body;
    
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

    const img = !image ? '' : image;

    await pool.query(queryHelper.addBus,
      [req.user.id, numberPlate, manufacturer,
        model, year, capacity, color, img, moment.createdAt]);

    const newBus = await pool.query(queryHelper.getBus, [numberPlate]);

    return res.status(201).json({
      status: 'success',
      data: newBus.rows[0],
    });
  }
}

const busController = new BusController();

export default busController;
