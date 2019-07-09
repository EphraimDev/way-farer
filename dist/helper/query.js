"use strict";

var cov_2epbagf2hv = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\helper\\query.js";
  var hash = "01f68397328a84704bcec2762c3775e86c33b828";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\helper\\query.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 14
        },
        end: {
          line: 23,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "01f68397328a84704bcec2762c3775e86c33b828"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const query = (cov_2epbagf2hv.s[0]++, {
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
  deleteBooking: 'DELETE FROM booking WHERE booking_id = $1',
  searchTrip: 'SELECT * FROM trip WHERE origin = $1 AND destination = $2',
  searchTripByOrigin: 'SELECT * FROM trip WHERE origin = $1',
  searchTripByDestination: 'SELECT * FROM trip WHERE destination = $1'
});
var _default = query;
exports.default = _default;