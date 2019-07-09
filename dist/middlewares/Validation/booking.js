"use strict";

var cov_2q9qmw9s8v = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\middlewares\\Validation\\booking.js";
  var hash = "6c6afcb15afbbb1091b146ab07330cea17614ea6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\middlewares\\Validation\\booking.js",
    statementMap: {
      "0": {
        start: {
          line: 18,
          column: 8
        },
        end: {
          line: 18,
          column: 16
        }
      },
      "1": {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 21,
          column: 5
        }
      },
      "2": {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 20,
          column: 68
        }
      },
      "3": {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 24,
          column: 5
        }
      },
      "4": {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 65
        }
      },
      "5": {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 18
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 15,
            column: 3
          }
        },
        loc: {
          start: {
            line: 15,
            column: 30
          },
          end: {
            line: 26,
            column: 3
          }
        },
        line: 15
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 21,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 21,
            column: 5
          }
        }, {
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 21,
            column: 5
          }
        }],
        line: 19
      },
      "1": {
        loc: {
          start: {
            line: 19,
            column: 8
          },
          end: {
            line: 19,
            column: 55
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 19,
            column: 8
          },
          end: {
            line: 19,
            column: 25
          }
        }, {
          start: {
            line: 19,
            column: 29
          },
          end: {
            line: 19,
            column: 55
          }
        }],
        line: 19
      },
      "2": {
        loc: {
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        }, {
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 24,
            column: 5
          }
        }],
        line: 22
      },
      "3": {
        loc: {
          start: {
            line: 22,
            column: 8
          },
          end: {
            line: 22,
            column: 40
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 22,
            column: 8
          },
          end: {
            line: 22,
            column: 12
          }
        }, {
          start: {
            line: 22,
            column: 16
          },
          end: {
            line: 22,
            column: 40
          }
        }],
        line: 22
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "6c6afcb15afbbb1091b146ab07330cea17614ea6"
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

/**
 * @exports
 * @class BookingValidation
 */
class BookingValidation {
  /**
              * Validate book trip input
              *
              * @staticmethod
              * @param  {object} req - Request object
              * @param {object} res - Response object
              * @param {function} next - middleware next (for error handling)
              * @return {json} res.json
              */
  static book(req, res, next) {
    cov_2q9qmw9s8v.f[0]++;
    const {
      tripId,
      seat
    } = (cov_2q9qmw9s8v.s[0]++, req.body);
    cov_2q9qmw9s8v.s[1]++;

    if ((cov_2q9qmw9s8v.b[1][0]++, tripId.length < 1) || (cov_2q9qmw9s8v.b[1][1]++, typeof tripId !== 'string')) {
      cov_2q9qmw9s8v.b[0][0]++;
      cov_2q9qmw9s8v.s[2]++;
      return res.status(400).json({
        error: 'Trip ID is a string'
      });
    } else {
      cov_2q9qmw9s8v.b[0][1]++;
    }

    cov_2q9qmw9s8v.s[3]++;

    if ((cov_2q9qmw9s8v.b[3][0]++, seat) && (cov_2q9qmw9s8v.b[3][1]++, typeof seat !== 'number')) {
      cov_2q9qmw9s8v.b[2][0]++;
      cov_2q9qmw9s8v.s[4]++;
      return res.status(400).json({
        error: 'Seat is a number'
      });
    } else {
      cov_2q9qmw9s8v.b[2][1]++;
    }

    cov_2q9qmw9s8v.s[5]++;
    return next();
  }

}

var _default = BookingValidation;
exports.default = _default;