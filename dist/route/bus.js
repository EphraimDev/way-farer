"use strict";

var cov_28lmy14bmc = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\bus.js";
  var hash = "0e547d81ed0bc46e0dad5fa3a230394a20e2d8c5";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\route\\bus.js",
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
          column: 59
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "0e547d81ed0bc46e0dad5fa3a230394a20e2d8c5"
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

var _bus = _interopRequireDefault(require("../middlewares/Validation/bus"));

var _bus2 = _interopRequireDefault(require("../controller/bus"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (cov_28lmy14bmc.s[0]++, _express.default.Router());
cov_28lmy14bmc.s[1]++;
router.post('/', _auth.default.authorize, _bus.default.add, _bus2.default.addBus);
var _default = router;
exports.default = _default;