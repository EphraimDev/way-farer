const query = {
  createUser: 'INSERT INTO users(user_id, email,first_name,last_name,password,img,is_admin,created_at) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING user_id, first_name, last_name, email, img, is_admin',
  updateUser: 'UPDATE users SET first_name=$1,last_name=$2,password=$3,img=$4,is_admin=$5,updated_at=$6 WHERE user_id = $7 RETURNING user_id, first_name, last_name, email, img, is_admin',
  text: 'SELECT * FROM users WHERE email = $1',
  userId: 'SELECT * FROM users WHERE user_id = $1',
  addBus: 'INSERT INTO bus(bus_id, user_id, number_plate, manufacturer, model, year, capacity, color, img, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING bus_id, number_plate, manufacturer, model, year, capacity, color, img',
  getBus: 'SELECT * FROM bus WHERE number_plate = $1',
  addTrip: 'INSERT INTO trip(trip_id, user_id, bus_id, origin, destination, trip_date, trip_time, fare, status, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING trip_id, bus_id, origin, destination, trip_date, fare, status',
  getTrip: 'SELECT * FROM trip WHERE trip_id = $1',
  getActiveBus: 'SELECT * FROM trip WHERE bus_id = $1 AND status = $2',
  getTripById: 'SELECT * FROM trip WHERE trip_id = $1',
  getBusById: 'SELECT * FROM bus WHERE bus_id = $1',
  cancelTrip: 'UPDATE trip SET status = ($1), updated_at = ($2) WHERE trip_id = ($3)',
  allTrips: 'SELECT * FROM trip',
  bookTrip: 'INSERT INTO booking(booking_id, user_id, trip_id, seat_number, created_at) values($1,$2,$3,$4,$5) RETURNING booking_id, user_id, trip_id, seat_number',
  getBooking: 'SELECT * FROM booking WHERE booking_id = $1',
  allTripBooking: 'SELECT * FROM booking WHERE trip_id = $1',
  adminBooking: 'SELECT * FROM booking',
  userBooking: 'SELECT * FROM booking WHERE user_id = $1',
  matchBooking: 'SELECT * FROM booking WHERE user_id = $1 AND booking_id = $2',
  deleteBooking: 'DELETE FROM booking WHERE booking_id = $1',
  searchTrip: 'SELECT * FROM trip WHERE origin = $1 AND destination = $2',
  searchTripByOrigin: 'SELECT * FROM trip WHERE origin = $1',
  searchTripByDestination: 'SELECT * FROM trip WHERE destination = $1',
};

export default query;
