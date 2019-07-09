"use strict";

var cov_24vz1qk5jz = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\auth.js";
  var hash = "0084bcaa29a470b2293e14234efac3ea6c192a12";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\auth.js",
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
          column: 61
        }
      },
      "2": {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 58
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "0084bcaa29a470b2293e14234efac3ea6c192a12"
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

var _auth = _interopRequireDefault(require("../middlewares/Validation/auth"));

var _auth2 = _interopRequireDefault(require("../controller/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import auth from '../../middleware/auth';
const router = (cov_24vz1qk5jz.s[0]++, _express.default.Router());
cov_24vz1qk5jz.s[1]++;
router.post('/signup', _auth.default.validateSignUp, _auth2.default.signup);
cov_24vz1qk5jz.s[2]++;
router.post('/login', _auth.default.validateLogin, _auth2.default.login);
var _default = router;
exports.default = _default;