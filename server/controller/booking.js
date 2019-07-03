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
      return res.status(400).json({
        status: 'error',
        error: 'Selected trip does not exist',
      });
    }

    const { status } = findTrip.rows[0];
    const todaydate = new Date().getTime();
    const tripDate = new Date(findTrip.rows[0].trip_date).getTime();

    if (status === 'Cancelled' || status === 'Ended' || tripDate <= todaydate) {
      return res.status(400).json({
        status: 'error',
        error: 'This trip is not available',
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
    // console.log(capacity);
    // const available = Math.floor(Math.random() * capacity) + 1;
    // console.log(available);

    if (seat) {
      booked.rows.forEach(({ seat_number }) => {
        if (seat_number === seat) {
          return res.status(400).json({
            status: 'error',
            error: 'Seat number is not available',
          });
        }
      });
    }

    const { id } = req.user;

    await pool.query(queryHelper.bookTrip,
      [id, tripId, seat, moment.createdAt]);

    const newBooking = await pool.query(queryHelper.getBooking, [tripId, id]);

    return res.status(201).json({
      status: 'success',
      data: newBooking.rows[0],
    });

    // const seatNumbersInArray = [];

    // for(var i = 1; i <= capacity; i++){
    //     seatNumbersInArray.push(i);
    // }

    // let remainingSeats = [];
    // let takenSeats = [];
    // let availableSeats = "";

    // if (seat) {
    //   booked.rows.forEach(({ seat_number }) => {
    //     if (seat_number !== null) {
    //       takenSeats.push(seat_number);
    //     }
    //   });

    //   seatNumbersInArray.forEach((num, i) => {
    //     const findSeat = takenSeats.includes(num);
    //     if (!findSeat) {
    //       remainingSeats.push(num);
    //     }
    //   })
    //   const isAvailable = remainingSeats.includes(seat);

    //   if (!isAvailable) {
    //     remainingSeats.forEach((num) => {
    //       availableSeats += num + " ";
    //     })
    //     return res.status(400).json({
    //       status: "error",
    //       error: `Seat number ${seat} is taken. Numbers ${availableSeats}are available `
    //     })
    //   }
    //   // console.log(takenSeats);
    // }
  }
}

export default BookingController;
