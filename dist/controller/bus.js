"use strict";

var cov_241wri2qbe = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\controller\\bus.js";
  var hash = "30003cd418475b0ad316ab05da02a43859f50b8a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\controller\\bus.js",
    statementMap: {
      "0": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 27
        }
      },
      "1": {
        start: {
          line: 26,
          column: 8
        },
        end: {
          line: 26,
          column: 16
        }
      },
      "2": {
        start: {
          line: 28,
          column: 18
        },
        end: {
          line: 28,
          column: 33
        }
      },
      "3": {
        start: {
          line: 30,
          column: 4
        },
        end: {
          line: 35,
          column: 5
        }
      },
      "4": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 34,
          column: 9
        }
      },
      "5": {
        start: {
          line: 37,
          column: 20
        },
        end: {
          line: 37,
          column: 71
        }
      },
      "6": {
        start: {
          line: 39,
          column: 4
        },
        end: {
          line: 44,
          column: 5
        }
      },
      "7": {
        start: {
          line: 40,
          column: 6
        },
        end: {
          line: 43,
          column: 9
        }
      },
      "8": {
        start: {
          line: 46,
          column: 16
        },
        end: {
          line: 46,
          column: 35
        }
      },
      "9": {
        start: {
          line: 48,
          column: 4
        },
        end: {
          line: 50,
          column: 62
        }
      },
      "10": {
        start: {
          line: 52,
          column: 19
        },
        end: {
          line: 52,
          column: 70
        }
      },
      "11": {
        start: {
          line: 54,
          column: 4
        },
        end: {
          line: 57,
          column: 7
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 11,
            column: 2
          },
          end: {
            line: 11,
            column: 3
          }
        },
        loc: {
          start: {
            line: 11,
            column: 16
          },
          end: {
            line: 13,
            column: 3
          }
        },
        line: 11
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 23,
            column: 2
          },
          end: {
            line: 23,
            column: 3
          }
        },
        loc: {
          start: {
            line: 23,
            column: 32
          },
          end: {
            line: 58,
            column: 3
          }
        },
        line: 23
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 35,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 35,
            column: 5
          }
        }, {
          start: {
            line: 30,
            column: 4
          },
          end: {
            line: 35,
            column: 5
          }
        }],
        line: 30
      },
      "1": {
        loc: {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 44,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 44,
            column: 5
          }
        }, {
          start: {
            line: 39,
            column: 4
          },
          end: {
            line: 44,
            column: 5
          }
        }],
        line: 39
      },
      "2": {
        loc: {
          start: {
            line: 46,
            column: 16
          },
          end: {
            line: 46,
            column: 35
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 46,
            column: 25
          },
          end: {
            line: 46,
            column: 27
          }
        }, {
          start: {
            line: 46,
            column: 30
          },
          end: {
            line: 46,
            column: 35
          }
        }],
        line: 46
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "30003cd418475b0ad316ab05da02a43859f50b8a"
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

var _db = _interopRequireDefault(require("../model/db"));

var _moment = _interopRequireDefault(require("../utils/moment"));

var _query = _interopRequireDefault(require("../helper/query"));

var _guid = _interopRequireDefault(require("../utils/guid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @exports
 * @class BusController
 */
class BusController {
  constructor() {
    cov_241wri2qbe.f[0]++;
    cov_241wri2qbe.s[0]++;
    this.bus = this.addBus;
  }
  /**
   * Add a new bus to the database
   * @method addBus
   * @memberof BusController
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */


  static async addBus(req, res) {
    cov_241wri2qbe.f[1]++;
    const {
      numberPlate,
      manufacturer,
      model,
      year,
      capacity,
      color,
      image
    } = (cov_241wri2qbe.s[1]++, req.body);
    const busId = (cov_241wri2qbe.s[2]++, _guid.default.formGuid());
    cov_241wri2qbe.s[3]++;

    if (req.user.is_admin !== true) {
      cov_241wri2qbe.b[0][0]++;
      cov_241wri2qbe.s[4]++;
      return res.status(401).json({
        status: 'error',
        error: 'Admin access only'
      });
    } else {
      cov_241wri2qbe.b[0][1]++;
    }

    const findBus = (cov_241wri2qbe.s[5]++, await _db.default.query(_query.default.getBus, [numberPlate]));
    cov_241wri2qbe.s[6]++;

    if (findBus.rowCount >= 1) {
      cov_241wri2qbe.b[1][0]++;
      cov_241wri2qbe.s[7]++;
      return res.status(409).json({
        status: 'error',
        error: 'A bus with same plate number already exists'
      });
    } else {
      cov_241wri2qbe.b[1][1]++;
    }

    const img = (cov_241wri2qbe.s[8]++, !image ? (cov_241wri2qbe.b[2][0]++, '') : (cov_241wri2qbe.b[2][1]++, image));
    cov_241wri2qbe.s[9]++;
    await _db.default.query(_query.default.addBus, [busId, req.user.user_id, numberPlate, manufacturer, model, year, capacity, color, img, _moment.default.createdAt]);
    const newBus = (cov_241wri2qbe.s[10]++, await _db.default.query(_query.default.getBus, [numberPlate]));
    cov_241wri2qbe.s[11]++;
    return res.status(201).json({
      status: 'success',
      data: newBus.rows[0]
    });
  }

}

var _default = BusController;
exports.default = _default;