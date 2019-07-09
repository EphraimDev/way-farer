"use strict";

var cov_czyattq1 = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\trip.js";
  var hash = "95b6d2593999960fbe69a93c60dc4a670adb0adb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\trip.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 15
        },
        end: {
          line: 6,
          column: 31
        }
      },
      "1": {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 97
        }
      },
      "2": {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 95
        }
      },
      "3": {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 35
        }
      },
      "4": {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 11,
          column: 42
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "95b6d2593999960fbe69a93c60dc4a670adb0adb"
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

var _express = _interopRequireDefault(require("express"));

var _trip = _interopRequireDefault(require("../middlewares/Validation/trip"));

var _trip2 = _interopRequireDefault(require("../controller/trip"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (cov_czyattq1.s[0]++, _express.default.Router());
cov_czyattq1.s[1]++;
router.post('/', _auth.default.authorize, _auth.default.checkAdmin, _trip.default.add, _trip2.default.addTrip);
cov_czyattq1.s[2]++;
router.delete('/:tripId', _auth.default.authorize, _auth.default.checkAdmin, _trip2.default.cancelTrip);
cov_czyattq1.s[3]++;
router.get('/', _trip2.default.getAllTrips);
cov_czyattq1.s[4]++;
router.get('/search?', _trip2.default.searchTrips);
var _default = router;
exports.default = _default;