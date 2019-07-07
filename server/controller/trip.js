import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import guid from '../utils/guid';

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

    const tripId = guid.formGuid();

    if (req.user === undefined || req.user.is_admin !== true) {
      return res.status(401).json({
        status: 'error',
        error: 'Admin access only',
      });
    }

    const findBus = await pool.query(queryHelper.getBusById, [busId]);

    if (findBus.rowCount < 1) {
      return res.status(404).json({
        status: 'error',
        error: 'Selected bus does not exist',
      });
    }

    const findActiveBus = await pool.query(queryHelper.getActiveBus, [busId, 'Active']);

    if (findActiveBus.rowCount >= 1) {
      return res.status(409).json({
        status: 'error',
        error: 'A trip with this bus is active',
      });
    }

    await pool.query(queryHelper.addTrip,
      [tripId, req.user.user_id, busId, origin, destination, tripDate, tripTime, fare, 'Active', moment.createdAt]);

    const newTrip = await pool.query(queryHelper.getTrip, [tripId]);

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

    if (req.user === undefined || req.user.is_admin !== true) {
      return res.status(401).json({
        status: 'error',
        error: 'Admin access only',
      });
    }

    const findTrip = await pool.query(queryHelper.getTripById, [tripId]);
    if (findTrip.rowCount < 1) {
      return res.status(404).json({
        status: 'error',
        error: 'Trip does not exist',
      });
    }

    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.rows[0].trip_date).getTime();

    if (tripDate <= todaydate || findTrip.rows[0] === 'Ended') {
      return res.status(400).json({
        status: 'error',
        error: 'Trip cannot be cancelled',
      });
    }

    const cancelTrip = await pool.query(queryHelper.cancelTrip, ['Cancelled', moment.updatedAt, findTrip.rows[0].trip_id]);

    return res.status(200).json({
      status: 'success',
      data: cancelTrip.rows[0],
    });
  }

  /**
   * Fetch all trips
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static async getAllTrips(req, res) {
    const trips = await pool.query(queryHelper.allTrips, []);

    if (trips.rowCount <= 0) {
      return res.status(404).json({
        status: 'error',
        error: 'There are no trips',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: trips.rows,
    });
  }

  /**
   * Search for trips
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async searchTrips(req, res) {
    const { origin, destination } = req.query;

    if (!origin && !destination) {
      TripController.getAllTrips(req, res);
    } else if (!origin && destination) {
      TripController.searchTripsByDestination(destination, res);
    } else if (origin && !destination) {
      TripController.searchTripsByOrigin(origin, res);
    }

    const trips = await pool.query(queryHelper.searchTrip, [origin, destination]);

    if (trips.rowCount <= 0) {
      return res.status(404).json({
        status: 'error',
        error: 'There are no trips',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: trips.rows,
    });
  }

  /**
   * Search for trips by origin
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async searchTripsByOrigin(origin, res) {
    const trips = await pool.query(queryHelper.searchTripByOrigin, [origin]);

    if (trips.rowCount <= 0) {
      return res.status(404).json({
        status: 'error',
        error: 'There are no trips',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: trips.rows,
    });
  }

  /**
   * Search for trips by origin
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async searchTripsByDestination(destination, res) {
    const trips = await pool.query(queryHelper.searchTripByDestination, [destination]);

    if (trips.rowCount <= 0) {
      return res.status(404).json({
        status: 'error',
        error: 'There are no trips',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: trips.rows,
    });
  }
}

export default TripController;
