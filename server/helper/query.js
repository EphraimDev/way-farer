const query = {
  createUser: 'INSERT INTO users(email,first_name,last_name,password,img,is_admin,created_at) values($1,$2,$3,$4,$5,$6,$7)',
  text: 'SELECT * FROM users WHERE email = $1',
  addBus: 'INSERT INTO bus(user_id, number_plate, manufacturer, model, year, capacity, color, img, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
  getBus: 'SELECT * FROM bus WHERE number_plate = $1',
  addTrip: 'INSERT INTO trip(bus_id, origin, destination, trip_date, trip_time, fare, status, created_at) values($1,$2,$3,$4,$5,$6,$7,$8)',
  getTrip: 'SELECT * FROM trip WHERE bus_id = $1 AND status = $2',
  getBusById: 'SELECT * FROM bus WHERE id = $1',
};

export default query;
