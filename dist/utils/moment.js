"use strict";

var cov_2jyuft3i8o = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\utils\\moment.js";
  var hash = "bf66b5278452a88a389710e9cb30f0c714f463b6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\utils\\moment.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 20
        },
        end: {
          line: 9,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "bf66b5278452a88a389710e9cb30f0c714f463b6"
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

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const momentCheck = (cov_2jyuft3i8o.s[0]++, {
  date: (0, _moment.default)().format('L'),
  time: (0, _moment.default)().format('LT'),
  createdAt: (0, _moment.default)().format(),
  updatedAt: (0, _moment.default)().format(),
  deletedAt: (0, _moment.default)().format()
});
var _default = momentCheck;
exports.default = _default;