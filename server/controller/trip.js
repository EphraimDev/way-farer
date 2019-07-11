import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import guid from '../utils/guid';
import jsonResponse from '../helper/responseHandler';

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
      return jsonResponse.error(res, 'error', 401, 'Admin access only');
    }

    const tripId = guid.formGuid();

    const findBus = await pool.query(queryHelper.getBusById, [busId]);

    if (findBus.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Selected bus does not exist');
    }

    const findActiveBus = await pool.query(queryHelper.getActiveBus, [busId, 'Active']);

    if (findActiveBus.rowCount >= 1) {
      return jsonResponse.error(res, 'error', 409, 'A trip with this bus is active');
    }

    const newTrip = await pool.query(queryHelper.addTrip,
      [tripId, req.user.user_id, busId, origin, destination, tripDate, tripTime, fare, 'Active', moment.createdAt]);

    return jsonResponse.success(res, 'success', 201, newTrip.rows[0]);
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

    const findTrip = await pool.query(queryHelper.getTripById, [tripId]);
    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.rows[0].trip_date).getTime();

    if (tripDate <= todaydate || findTrip.rows[0] === 'Ended') {
      return jsonResponse.error(res, 'error', 400, 'Trip cannot be cancelled');
    }

    const cancelTrip = await pool.query(queryHelper.cancelTrip, ['Cancelled', moment.updatedAt, findTrip.rows[0].trip_id]);

    return jsonResponse.success(res, 'success', 200, cancelTrip.rows[0]);
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
      return jsonResponse.error(res, 'error', 404, 'There are no trips');
    }

    return jsonResponse.success(res, 'success', 200, trips.rows);
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

    if (!origin && destination) {
      return TripController.searchTripsByDestination(destination, res);
    } if (origin && !destination) {
      return TripController.searchTripsByOrigin(origin, res);
    }

    return TripController.getAllTrips(req, res);
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
      return jsonResponse.error(res, 'error', 404, 'There are no trips');
    }

    return jsonResponse.success(res, 'success', 200, trips.rows);
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
      return jsonResponse.error(res, 'error', 404, 'There are no trips');
    }

    return jsonResponse.success(res, 'success', 200, trips.rows);
  }
}

export default TripController;
