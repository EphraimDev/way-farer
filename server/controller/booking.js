/* eslint camelcase: 0 */
import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import guid from '../utils/guid';

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

    const findTrip = await BookingController.findTrip(tripId, res);

    if (findTrip === false) {
      return res.status(400).json({
        status: 'error',
        error: 'This trip does not exist',
      });
    }

    const {
      status, bus_id, todaydate, tripDate,
    } = await BookingController.tripStatus(findTrip);

    const findBus = await BookingController.findBus(bus_id, res);

    const { capacity } = findBus;


    const booked = await pool.query(queryHelper.allTripBooking, [tripId]);

    if (capacity <= booked.rowCount || status === 'Cancelled' || status === 'Ended' || tripDate <= todaydate) {
      return res.status(400).json({
        status: 'error',
        error: 'Select another trip',
      });
    }

    if (seat && booked.rowCount > 0) {
      const checkSeat = await BookingController.checkSeat(booked.rows, seat);

      if (checkSeat !== undefined) {
        return res.status(400).json({
          status: 'error',
          error: 'Seat number is not available',
        });
      }
    }


    const { user_id } = req.user;
    const bookId = guid.formGuid();

    await pool.query(queryHelper.bookTrip,
      [bookId, user_id, tripId, seat, moment.createdAt]);

    const newBooking = await BookingController.getBooking(bookId);

    return res.status(201).json({
      status: 'success',
      data: newBooking,
    });
  }

  /**
   * Find Seat number
   * @staticmethod
   */
  static async checkSeat(bookings, seat) {
    const checkSeat = bookings.find(({ seat_number }) => seat_number === seat);

    return checkSeat;
  }

  /**
   * Find Trip
   * @staticmethod
   */
  static async findTrip(tripId) {
    const findTrip = await pool.query(queryHelper.getTripById, [tripId]);

    if (findTrip.rowCount < 1) {
      return false;
    }

    return findTrip.rows[0];
  }

  /**
   * Trip status
   * @staticmethod
   */
  static async tripStatus(findTrip) {
    const { status, bus_id } = findTrip;
    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.trip_date).getTime();

    return {
      status, bus_id, todaydate, tripDate,
    };
  }

  /**
   * Get booking
   * @staticmethod
   */
  static async getBooking(bookId) {
    const booking = await pool.query(queryHelper.getBooking, [bookId]);

    return booking.rows[0];
  }


  /**
   * Find Bus
   * @staticmethod
   */
  static async findBus(busId) {
    const bus = await pool.query(queryHelper.getBusById, [busId]);

    return bus.rows[0];
  }

  /**
   * Fetch all bookings
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async getAllBookings(req, res) {
    const { user_id, is_admin } = req.user;

    let bookings = [];

    if (is_admin === true) {
      bookings = await pool.query(queryHelper.adminBooking, []);
    } else {
      bookings = await pool.query(queryHelper.userBooking, [user_id]);
    }

    if (bookings.rowCount <= 0 || bookings.length <= 0) {
      return res.status(404).json({
        status: 'error',
        error: 'There are no bookings',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: bookings.rows,
    });
  }

  /**
   * Delete a booking
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async deleteBooking(req, res) {
    const { bookingId } = req.params;

    const { user_id } = req.user;

    const bookingDetails = await pool.query(queryHelper.matchBooking, [user_id, bookingId]);

    if (bookingDetails.rowCount === 0) {
      return res.status(404).json({
        error: 'Booking does not belong to user',
        status: 'error',
      });
    }

    const { trip_id } = bookingDetails.rows[0];

    const findTrip = await pool.query(queryHelper.getTripById, [trip_id]);

    const { trip_date, trip_time } = findTrip.rows[0];

    const tripStart = new Date(`${trip_date.toLocaleDateString()} ${trip_time}`);

    if (tripStart <= new Date()) {
      return res.status(400).json({
        status: 'error',
        error: 'This booking cannot be deleted',
      });
    }

    await pool.query(queryHelper.deleteBooking, [bookingId]);

    return res.status(200).json({
      status: 'success',
    });
  }
}

export default BookingController;
