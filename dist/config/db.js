"use strict";

var cov_1qgaiynwuo = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\config\\db.js";
  var hash = "08a432482efe1129488f117f3da919940f8e123e";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\config\\db.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 0
        },
        end: {
          line: 3,
          column: 16
        }
      },
      "1": {
        start: {
          line: 5,
          column: 15
        },
        end: {
          line: 41,
          column: 1
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
    hash: "08a432482efe1129488f117f3da919940f8e123e"
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

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_1qgaiynwuo.s[0]++;

_dotenv.default.config();

const config = (cov_1qgaiynwuo.s[1]++, {
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    url: process.env.DATABASE_URL
  },
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    url: process.env.DATABASE_URL
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DB_DATABASE,
    name: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST
  },
  jwtSecret: process.env.JWT_KEY,
  mail: {
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password
      }
    }
  }
});
var _default = config;
exports.default = _default;