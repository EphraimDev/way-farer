"use strict";

var cov_1gnqjoeye2 = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\migrations\\dropTable.js";
  var hash = "3c32d6f2a23eaeb2e3a5b8120f11c0f42fc62f5b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\migrations\\dropTable.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 18
        },
        end: {
          line: 4,
          column: 71
        }
      },
      "1": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 14,
          column: 5
        }
      },
      "2": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 21
        }
      },
      "3": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 15
        }
      },
      "4": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 21
        }
      },
      "5": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 15
        }
      },
      "6": {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 19,
          column: 3
        }
      },
      "7": {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 17,
          column: 32
        }
      },
      "8": {
        start: {
          line: 18,
          column: 2
        },
        end: {
          line: 18,
          column: 18
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 8
          },
          end: {
            line: 8,
            column: 9
          }
        },
        loc: {
          start: {
            line: 8,
            column: 17
          },
          end: {
            line: 11,
            column: 3
          }
        },
        line: 8
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 11,
            column: 11
          },
          end: {
            line: 11,
            column: 12
          }
        },
        loc: {
          start: {
            line: 11,
            column: 20
          },
          end: {
            line: 14,
            column: 3
          }
        },
        line: 11
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 16,
            column: 18
          },
          end: {
            line: 16,
            column: 19
          }
        },
        loc: {
          start: {
            line: 16,
            column: 24
          },
          end: {
            line: 19,
            column: 1
          }
        },
        line: 16
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
      "7": 0,
      "8": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "3c32d6f2a23eaeb2e3a5b8120f11c0f42fc62f5b"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryText = (cov_1gnqjoeye2.s[0]++, 'DROP TABLE IF EXISTS booking trip bus users CASCADE');
cov_1gnqjoeye2.s[1]++;

_db.default.query(queryText).then(res => {
  cov_1gnqjoeye2.f[0]++;
  cov_1gnqjoeye2.s[2]++;
  console.log(res);
  cov_1gnqjoeye2.s[3]++;

  _db.default.end();
}).catch(err => {
  cov_1gnqjoeye2.f[1]++;
  cov_1gnqjoeye2.s[4]++;
  console.log(err);
  cov_1gnqjoeye2.s[5]++;

  _db.default.end();
});

cov_1gnqjoeye2.s[6]++;

_db.default.on('remove', () => {
  cov_1gnqjoeye2.f[2]++;
  cov_1gnqjoeye2.s[7]++;
  console.log('Client removed');
  cov_1gnqjoeye2.s[8]++;
  process.exit(0);
});