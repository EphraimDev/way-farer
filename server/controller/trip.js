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

  /**
   * Admin cancel trip
   * @staticmethod
   * @method cancelTrip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async cancelTrip(req, res) {
    const { tripId } = req.params;

    if (req.user.is_admin !== true) {
      return res.status(401).json({
        status: 'error',
        error: 'Admin access only',
      });
    }

    const findTrip = await pool.query(queryHelper.getTrip, [tripId, 'Active']);
console.log(findTrip.rows[0])
    if (findTrip.rowCount < 1) {
      return res.status(404).json({
        status: 'error',
        error: 'Trip does not exist',
      });
    }

    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.rows[0].trip_date).getTime();

    console.log(todaydate, tripDate)

    if (tripDate <= todaydate   || findTrip.rows[0] === 'Ended') {
      return res.status(400).json({
        status: 'error',
        error: 'Trip cannot be cancelled',
      });
    }

    const cancelTrip = await pool.query(queryHelper.cancelTrip, ['Cancelled', moment.updatedAt, findTrip.rows[0].id]);

    return res.status(200).json({
      status: 'success',
      data: cancelTrip.rows[0],
    });
  }
}

export default TripController;
