const query = {
  createUser: 'INSERT INTO users(user_id, email,first_name,last_name,password,img,is_admin,created_at) values($1,$2,$3,$4,$5,$6,$7,$8)',
  text: 'SELECT * FROM users WHERE email = $1',
  addBus: 'INSERT INTO bus(bus_id, user_id, number_plate, manufacturer, model, year, capacity, color, img, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
  getBus: 'SELECT * FROM bus WHERE number_plate = $1',
  addTrip: 'INSERT INTO trip(trip_id, user_id, bus_id, origin, destination, trip_date, trip_time, fare, status, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
  getTrip: 'SELECT * FROM trip WHERE trip_id = $1',
  getActiveBus: 'SELECT * FROM trip WHERE bus_id = $1 AND status = $2',
  getTripById: 'SELECT * FROM trip WHERE trip_id = $1',
  getBusById: 'SELECT * FROM bus WHERE bus_id = $1',
  cancelTrip: 'UPDATE trip SET status = ($1), updated_at = ($2) WHERE trip_id = ($3)',
  allTrips: 'SELECT * FROM trip',
  bookTrip: 'INSERT INTO booking(booking_id, user_id, trip_id, seat_number, created_at) values($1,$2,$3,$4,$5)',
  getBooking: 'SELECT * FROM booking WHERE booking_id = $1',
  allTripBooking: 'SELECT * FROM booking WHERE trip_id = $1',
  adminBooking: 'SELECT * FROM booking',
  userBooking: 'SELECT * FROM booking WHERE user_id = $1',
  matchBooking: 'SELECT * FROM booking WHERE user_id = $1 AND booking_id = $2',
  deleteBooking: 'DELETE FROM booking WHERE booking_id = $1'
};

export default query;
