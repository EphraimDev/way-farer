"use strict";

var cov_29ldftujf5 = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\booking.js";
  var hash = "577b33ed4f247d2f3823c3469ab4b5bc185b7636";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\booking.js",
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
          column: 75
        }
      },
      "2": {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 65
        }
      },
      "3": {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 77
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "577b33ed4f247d2f3823c3469ab4b5bc185b7636"
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

var _booking = _interopRequireDefault(require("../middlewares/Validation/booking"));

var _booking2 = _interopRequireDefault(require("../controller/booking"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (cov_29ldftujf5.s[0]++, _express.default.Router());
cov_29ldftujf5.s[1]++;
router.post('/', _auth.default.authorize, _booking.default.book, _booking2.default.bookTrip);
cov_29ldftujf5.s[2]++;
router.get('/', _auth.default.authorize, _booking2.default.getAllBookings);
cov_29ldftujf5.s[3]++;
router.delete('/:bookingId', _auth.default.authorize, _booking2.default.deleteBooking);
var _default = router;
exports.default = _default;