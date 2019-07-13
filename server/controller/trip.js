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
      bus_id, origin, destination, trip_date, trip_time, fare,
    } = req.body;

    const findBus = await pool.query(queryHelper.getBusById, [bus_id]);

    if (findBus.rowCount < 1) {
      console.log("post /trips", "404")
      return jsonResponse.error(res, 'error', 404, 'Selected bus does not exist');
    }

    // const findActiveBus = await pool.query(queryHelper.getActiveBus, [bus_id, 'Active']);

    // if (findActiveBus.rowCount >= 1) {
    //   return jsonResponse.error(res, 'error', 409, 'A trip with this bus is active');
    // }

    let tripTime = trip_time;
    if (!trip_time) {
      const date = new Date();
      tripTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
    const newTrip = await pool.query(queryHelper.addTrip,
      [req.user.user_id, bus_id, origin.toLowerCase(), destination.toLowerCase(), trip_date, tripTime, fare, 'Active', moment.createdAt]);
    newTrip.rows[0]['id'] = newTrip.rows[0].trip_id;
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
    const { trip_id } = req.params;

    const findTrip = await pool.query(queryHelper.getTripById, [trip_id]);
    if (findTrip.rowCount < 1) {
      console.log("delete /trips", "404")
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    const todaydate = new Date().getTime();
    const trip_date = new Date(findTrip.rows[0].trip_date).getTime();

    if (trip_date <= todaydate || findTrip.rows[0] === 'Ended') {
      console.log("delete /trips", "400")
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
      console.log("get /trips", "404")
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
      return TripController.searchTripsByQuery(null, destination, res);
    } if (origin && !destination) {
      return TripController.searchTripsByQuery(origin, null, res);
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
  static async searchTripsByQuery(origin, destination, res) {
    let trips = '';
    if (destination === null) {
      trips = await pool.query(queryHelper.searchTripByOrigin, [origin.toLowerCase()]);
    } else if (origin === null) {
      trips = await pool.query(queryHelper.searchTripByDestination, [destination.toLowerCase()]);
    }

    if (trips.rowCount <= 0) {
      return jsonResponse.error(res, 'error', 404, 'There are no trips');
    }

    return jsonResponse.success(res, 'success', 200, trips.rows);
  }

   /**
   * Update user trip
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async updateTrip(req, res) {
    const { trip_id } = req.params;

    const findTrip = await pool.query(queryHelper.getTrip, [trip_id]);

    if (findTrip.rowCount < 1) {
      return jsonResponse.error(res, 'error', 404, 'Trip does not exist');
    }

    const {
      busId, newOrigin, newDestination, tripDate, tripTime, newFare, newStatus
    } = await TripController.bodyParams(req, findTrip.rows[0]);

    const updatedTrip = await pool.query(queryHelper.updateTrip,
      [busId, newOrigin.toLowerCase(), newDestination.toLowerCase(), tripDate, tripTime, newFare, newStatus, moment.updatedAt, trip_id]);

    return jsonResponse.success(res, 'success', 200, updatedTrip.rows[0]);
  }

  static async bodyParams(req, findTrip) {
    const {
      bus_id, origin, destination, trip_date, trip_time, fare, status,
    } = req.body;

    const busId = bus_id !== undefined ? bus_id : findTrip.bus_id;
    const newOrigin = origin !== undefined ? origin : findTrip.origin;
    const newDestination = destination !== undefined ? destination : findTrip.destination;
    const tripDate = trip_date !== undefined ? trip_date : findTrip.trip_date;
    const tripTime = trip_time !== undefined ? trip_time : findTrip.trip_time;
    const newFare = fare !== undefined ? fare : findTrip.fare;
    const newStatus = status !== undefined ? status : findTrip.status;

    return {
      busId, newOrigin, newDestination, tripDate, tripTime, newFare, newStatus
    };
  }
}

export default TripController;
