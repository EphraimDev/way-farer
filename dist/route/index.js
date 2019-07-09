"use strict";

var cov_1iwxmawddg = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\index.js";
  var hash = "a9d148afae488466ac8f5a5975ff2d6f083a4642";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\index.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 15
        },
        end: {
          line: 7,
          column: 31
        }
      },
      "1": {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 26
        }
      },
      "2": {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 24
        }
      },
      "3": {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 11,
          column: 27
        }
      },
      "4": {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 12,
          column: 30
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
    hash: "a9d148afae488466ac8f5a5975ff2d6f083a4642"
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

var _auth = _interopRequireDefault(require("./auth"));

var _bus = _interopRequireDefault(require("./bus"));

var _trip = _interopRequireDefault(require("./trip"));

var _booking = _interopRequireDefault(require("./booking"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (cov_1iwxmawddg.s[0]++, _express.default.Router());
cov_1iwxmawddg.s[1]++;
router.use('/auth', _auth.default);
cov_1iwxmawddg.s[2]++;
router.use('/bus', _bus.default);
cov_1iwxmawddg.s[3]++;
router.use('/trips', _trip.default);
cov_1iwxmawddg.s[4]++;
router.use('/bookings', _booking.default);
var _default = router;
exports.default = _default;