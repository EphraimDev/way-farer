"use strict";

var cov_df4luy0yf = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\model\\db.js";
  var hash = "153814d29368401a4c625050049ccb54effd191e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\model\\db.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 18
        },
        end: {
          line: 11,
          column: 1
        }
      },
      "1": {
        start: {
          line: 13,
          column: 19
        },
        end: {
          line: 13,
          column: 43
        }
      },
      "2": {
        start: {
          line: 15,
          column: 19
        },
        end: {
          line: 21,
          column: 1
        }
      },
      "3": {
        start: {
          line: 23,
          column: 17
        },
        end: {
          line: 23,
          column: 75
        }
      },
      "4": {
        start: {
          line: 25,
          column: 13
        },
        end: {
          line: 25,
          column: 122
        }
      },
      "5": {
        start: {
          line: 29,
          column: 0
        },
        end: {
          line: 31,
          column: 3
        }
      },
      "6": {
        start: {
          line: 30,
          column: 2
        },
        end: {
          line: 30,
          column: 43
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 29,
            column: 19
          },
          end: {
            line: 29,
            column: 20
          }
        },
        loc: {
          start: {
            line: 29,
            column: 25
          },
          end: {
            line: 31,
            column: 1
          }
        },
        line: 29
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 23,
            column: 17
          },
          end: {
            line: 23,
            column: 75
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 23,
            column: 53
          },
          end: {
            line: 23,
            column: 63
          }
        }, {
          start: {
            line: 23,
            column: 66
          },
          end: {
            line: 23,
            column: 75
          }
        }],
        line: 23
      },
      "1": {
        loc: {
          start: {
            line: 25,
            column: 13
          },
          end: {
            line: 25,
            column: 122
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 25,
            column: 55
          },
          end: {
            line: 25,
            column: 98
          }
        }, {
          start: {
            line: 25,
            column: 101
          },
          end: {
            line: 25,
            column: 122
          }
        }],
        line: 25
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "153814d29368401a4c625050049ccb54effd191e"
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

var _pg = _interopRequireDefault(require("pg"));

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create configurations for database
const devConfig = (cov_df4luy0yf.s[0]++, {
  database: _db.default.development.database,
  host: _db.default.development.host,
  user: _db.default.development.username,
  password: _db.default.development.password,
  port: 5432
});
const prodConfig = (cov_df4luy0yf.s[1]++, process.env.DATABASE_URL);
const testConfig = (cov_df4luy0yf.s[2]++, {
  database: _db.default.test.database,
  host: _db.default.test.host,
  user: _db.default.test.username,
  password: _db.default.test.password,
  port: 5432
});
const dbConfig = (cov_df4luy0yf.s[3]++, process.env.NODE_ENV === 'test' ? (cov_df4luy0yf.b[0][0]++, testConfig) : (cov_df4luy0yf.b[0][1]++, devConfig));
const pool = (cov_df4luy0yf.s[4]++, process.env.NODE_ENV === 'production' ? (cov_df4luy0yf.b[1][0]++, new _pg.default.Pool({
  connectionString: prodConfig
})) : (cov_df4luy0yf.b[1][1]++, new _pg.default.Pool(dbConfig)));
cov_df4luy0yf.s[5]++;
pool.on('connect', () => {
  cov_df4luy0yf.f[0]++;
  cov_df4luy0yf.s[6]++;
  console.log('connected to the Database');
});
var _default = pool;
exports.default = _default;