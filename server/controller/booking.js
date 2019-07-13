/* eslint camelcase: 0 */
import pool from '../model/db';
import moment from '../utils/moment';
import queryHelper from '../helper/query';
import guid from '../utils/guid';
import jsonResponse from '../helper/responseHandler';

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
    const { trip_id, seat } = req.body;

    const findTrip = await BookingController.findTrip(trip_id, res);

    if (findTrip === false) {
      return jsonResponse.error(res, 'error', 404, 'This trip does not exist');
    }

    const {
      status, bus_id, todaydate, tripDate, realDate,
    } = await BookingController.tripStatus(findTrip);

    const findBus = await BookingController.findBus(bus_id, res);

    const booked = await pool.query(queryHelper.allTripBooking, [trip_id]);

    if (findBus.capacity <= booked.rowCount || status === 'Cancelled' || status === 'Ended' || tripDate <= todaydate) {
      return jsonResponse.error(res, 'error', 400, 'Select another trip');
    }

    if (seat && booked.rowCount > 0) {
      const checkSeat = await BookingController.checkSeat(booked.rows, seat);

      if (checkSeat !== undefined) {
        return jsonResponse.error(res, 'error', 400, 'Seat number is not available');
      }
    }

    let seatNumber = seat;
    if (!seat) {
      if (booked.rowCount > 0) {
        seatNumber = await BookingController.assignSeatNumber(booked.rows, findBus.capacity);
      } else {
        seatNumber = 1;
      }
    }

    const newBooking = await pool.query(queryHelper.bookTrip,
      [req.user.user_id, trip_id, seatNumber, moment.createdAt]);

    const user = await await pool.query(queryHelper.userId, [req.user.user_id]);

    const data = {
      ...newBooking.rows[0],
      user_id: req.user.user_id,
      first_name: user.rows[0].first_name,
      last_name: user.rows[0].last_name,
      email: user.rows[0].email,
      bus_id,
      trip_date: realDate,
      trip_time: findTrip.trip_time,
      origin: findTrip.origin,
      destination: findTrip.destination,
      fare: findTrip.fare,
      id: newBooking.rows[0].booking_id
    };

    return jsonResponse.success(res, 'success', 201, data);
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
   * Assign Seat Number
   * @staticmethod
   */
  static async assignSeatNumber(bookings, capacity) {
    const capacityArr = [];
    const takenSeats = [];
    for (let i = 1; i <= capacity;) {
      capacityArr.push(i);
      i += 1;
    }

    await bookings.forEach(({ seat_number }) => {
      takenSeats.push(seat_number);
    });

    const newSeat = await BookingController.fetchSeat(capacityArr, takenSeats);
    
    return newSeat;
  }

  /**
   * Assign Seat Number
   * @staticmethod
   */
  static async fetchSeat(capacity, taken) {
    const seat = await capacity.find(num => taken.includes(num) === false);
    
    return seat;
  }

  /**
   * Find Trip
   * @staticmethod
   */
  static async findTrip(trip_id) {
    const findTrip = await pool.query(queryHelper.getTripById, [trip_id]);

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
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    const realDate = findTrip.trip_date.toLocaleDateString('en-US', options);

    return {
      status, bus_id, todaydate, tripDate, realDate,
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

    //let bookings = [];

    // if (is_admin === true) {
    //   bookings = await pool.query(queryHelper.adminBooking, []);
    // } else {
    //   bookings = await pool.query(queryHelper.userBooking, [user_id]);
    // }

    const bookings = await pool.query(queryHelper.adminBooking, []);

    if (bookings.rowCount <= 0 || bookings.length <= 0) {
      return jsonResponse.error(res, 'error', 404, 'There are no bookings');
    }

    return jsonResponse.success(res, 'success', 200, bookings.rows);
  }

  /**
   * Delete a booking
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async deleteBooking(req, res) {
    const { booking_id } = req.params;

    const { user_id } = req.user;

    const bookingDetails = await pool.query(queryHelper.matchBooking, [user_id, booking_id]);

    if (bookingDetails.rowCount === 0) {
      return jsonResponse.error(res, 'error', 404, 'Booking does not belong to user');
    }

    const { trip_id } = bookingDetails.rows[0];

    const findTrip = await pool.query(queryHelper.getTripById, [trip_id]);

    const { trip_date, trip_time } = findTrip.rows[0];

    const tripStart = new Date(`${trip_date.toLocaleDateString()} ${trip_time}`);

    if (tripStart <= new Date()) {
      return jsonResponse.error(res, 'error', 400, 'This booking cannot be deleted');
    }

    await pool.query(queryHelper.deleteBooking, ['1', moment.deletedAt, booking_id]);

    const returnData = await pool.query(queryHelper.cancelBooking, [booking_id]);

    return jsonResponse.success(res, 'success', 200, returnData.rows[0]);
  }
}

export default BookingController;
