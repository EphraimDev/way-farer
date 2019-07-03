import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';

/**
 * @exports
 * @class BookingController
 */
class BookingController {
  /**
   * Add a new Trip to the database
   * @method bookTrip
   * @memberof BookingController
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async bookTrip(req, res) {
    const {
      tripId, seat,
    } = req.body;

    const findTrip = await pool.query(queryHelper.getTripById, [tripId]);

    if (findTrip.rowCount < 1) {
      return res.status(409).json({
        status: 'error',
        error: 'Selected trip does not exist',
      });
    }

    const { status } = findTrip.rows[0];
    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.rows[0].trip_date).getTime();

    if (status === 'Cancelled' || status === 'Ended' || tripDate <= todaydate) {
      return res.status(409).json({
        status: 'error',
        error: 'This trip cannot be booked',
      });
    }

    const { bus_id } = findTrip.rows[0];
    const bus = await pool.query(queryHelper.getBusById, [bus_id]);
    const { capacity } = bus.rows[0];
    const booked = await pool.query(queryHelper.allTripBooking, [tripId]);

    // if (capacity <= booked.rowCount) {
    //   return res.status(400).json({
    //     status: 'error',
    //     error: 'Selected trip is completely booked',
    //   });
    // }
    console.log(capacity);
    const available = Math.floor(Math.random() * capacity) + 1;
    console.log(available);
    if (seat) {
      booked.rows.forEach(({ seat_number }) => {
        if (seat === seat_number) {
          return res.status(400).json({
            status: 'error',
            error: 'Selected seat has been taken',
          });
        }
      });
      // console.log(takenSeats);
    }
    const { id } = req.user;

    await pool.query(queryHelper.bookTrip,
      [id, tripId, seat, moment.createdAt]);

    const newBooking = await pool.query(queryHelper.getBooking, [tripId, id]);
    console.log(newBooking.rows[0]);
    // return res.status(201).json({
    //   status: 'success',
    //   data: newTrip.rows[0],
    // });
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

    const findTrip = await pool.query(queryHelper.getTripById, [tripId]);
    if (findTrip.rowCount < 1) {
      return res.status(404).json({
        status: 'error',
        error: 'Trip does not exist',
      });
    }

    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.rows[0].trip_date).getTime();

    if (tripDate <= todaydate || findTrip.rows[0].status === 'Ended') {
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
}

export default BookingController;
