import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';

/**
 * @exports
 * @class TripController
 */
class TripController {
  /**
   * Add a new Trip to the database
   * @method addTrip
   * @memberof TripController
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async addTrip(req, res) {
    const {
      busId, origin, destination, tripDate, tripTime, fare,
    } = req.body;

    if (req.user.is_admin !== true) {
      return res.status(401).json({
        status: 'error',
        error: 'Admin access only',
      });
    }

    const findBus = await pool.query(queryHelper.getBusById, [busId]);

    if (findBus.rowCount < 1) {
      return res.status(409).json({
        status: 'error',
        error: 'Selected bus does not exist',
      });
    }

    const findActiveBus = await pool.query(queryHelper.getTrip, [busId, 'Active']);

    if (findActiveBus.rowCount >= 1) {
      return res.status(409).json({
        status: 'error',
        error: 'A trip with this bus is active',
      });
    }

    await pool.query(queryHelper.addTrip,
      [busId, origin, destination, tripDate, tripTime, fare, 'Active', moment.createdAt]);

    const newTrip = await pool.query(queryHelper.getTrip, [busId, 'Active']);

    return res.status(201).json({
      status: 'success',
      data: newTrip.rows[0],
    });
  }
}

export default TripController;
