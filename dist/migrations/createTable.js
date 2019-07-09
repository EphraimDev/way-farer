"use strict";

var cov_xbdbwyquf = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\migrations\\createTable.js";
  var hash = "1d255de5ba82b91ccc48be2e839b1a31c8a9cad6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\migrations\\createTable.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 0
        },
        end: {
          line: 6,
          column: 5
        }
      },
      "1": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 45
        }
      },
      "2": {
        start: {
          line: 8,
          column: 20
        },
        end: {
          line: 74,
          column: 5
        }
      },
      "3": {
        start: {
          line: 76,
          column: 2
        },
        end: {
          line: 85,
          column: 5
        }
      },
      "4": {
        start: {
          line: 79,
          column: 4
        },
        end: {
          line: 79,
          column: 21
        }
      },
      "5": {
        start: {
          line: 80,
          column: 4
        },
        end: {
          line: 80,
          column: 15
        }
      },
      "6": {
        start: {
          line: 83,
          column: 4
        },
        end: {
          line: 83,
          column: 21
        }
      },
      "7": {
        start: {
          line: 84,
          column: 4
        },
        end: {
          line: 84,
          column: 15
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 4,
            column: 19
          },
          end: {
            line: 4,
            column: 20
          }
        },
        loc: {
          start: {
            line: 4,
            column: 25
          },
          end: {
            line: 6,
            column: 3
          }
        },
        line: 4
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 78,
            column: 8
          },
          end: {
            line: 78,
            column: 9
          }
        },
        loc: {
          start: {
            line: 78,
            column: 15
          },
          end: {
            line: 81,
            column: 3
          }
        },
        line: 78
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 82,
            column: 9
          },
          end: {
            line: 82,
            column: 10
          }
        },
        loc: {
          start: {
            line: 82,
            column: 16
          },
          end: {
            line: 85,
            column: 3
          }
        },
        line: 82
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "1d255de5ba82b91ccc48be2e839b1a31c8a9cad6"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_xbdbwyquf.s[0]++;

_db.default.on('connect', () => {
  cov_xbdbwyquf.f[0]++;
  cov_xbdbwyquf.s[1]++;
  console.log('Connected to the database');
});

const queryText = (cov_xbdbwyquf.s[2]++, `CREATE TYPE action AS ENUM
  ('Active', 'Cancelled', 'Ended');
  
  CREATE TABLE users
  (
      id SERIAL NOT NULL,
      user_id VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      img VARCHAR(128),
      is_admin BOOLEAN NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(id, user_id),
      UNIQUE (user_id)
  );
  
  CREATE TABLE bus
  (
      id SERIAL NOT NULL,
      bus_id VARCHAR(128) NOT NULL,
      user_id VARCHAR(128),
      number_plate VARCHAR(128) NOT NULL,
      manufacturer VARCHAR(128) NOT NULL,
      model VARCHAR(128) NOT NULL,
      year INT NOT NULL,
      capacity INT NOT NULL,
      color VARCHAR(128),
      img VARCHAR(500),
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(user_id),
      PRIMARY KEY(id, bus_id),
      UNIQUE (bus_id)
  );
  
  CREATE TABLE trip
  (
      id SERIAL NOT NULL,
      trip_id VARCHAR(128) NOT NULL,
      user_id VARCHAR(128) REFERENCES users(user_id) NOT NULL,
      bus_id VARCHAR(128) REFERENCES bus(bus_id) NOT NULL,
      origin VARCHAR(500) NOT NULL,
      destination VARCHAR(500) NOT NULL,
      trip_date DATE NOT NULL,
      trip_time TIME NOT NULL,
      fare VARCHAR(128) NOT NULL,
      status action default 'Active',
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(id, trip_id),
      UNIQUE (trip_id)
  );
  
  CREATE TABLE booking
  (
      id SERIAL NOT NULL,
      booking_id VARCHAR(128) NOT NULL,
      trip_id VARCHAR(128) REFERENCES trip(trip_id) NOT NULL,
      user_id VARCHAR(128) REFERENCES users(user_id) NOT NULL,
      seat_number INT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY(id, booking_id)
  );`);
cov_xbdbwyquf.s[3]++;

_db.default.query(queryText).then(res => {
  cov_xbdbwyquf.f[1]++;
  cov_xbdbwyquf.s[4]++;
  console.log(res);
  cov_xbdbwyquf.s[5]++;

  _db.default.end();
}).catch(err => {
  cov_xbdbwyquf.f[2]++;
  cov_xbdbwyquf.s[6]++;
  console.log(err);
  cov_xbdbwyquf.s[7]++;

  _db.default.end();
});