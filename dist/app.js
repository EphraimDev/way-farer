"use strict";

var cov_1s9l80stkw = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\app.js";
  var hash = "2d7b66bdf3b9da2e6f34a12c6ddd346ca60eeb6c";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\app.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 12
        },
        end: {
          line: 9,
          column: 21
        }
      },
      "1": {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 11,
          column: 29
        }
      },
      "2": {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 16,
          column: 2
        }
      },
      "3": {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 27
        }
      },
      "4": {
        start: {
          line: 18,
          column: 0
        },
        end: {
          line: 18,
          column: 27
        }
      },
      "5": {
        start: {
          line: 20,
          column: 13
        },
        end: {
          line: 20,
          column: 37
        }
      },
      "6": {
        start: {
          line: 23,
          column: 26
        },
        end: {
          line: 31,
          column: 3
        }
      },
      "7": {
        start: {
          line: 34,
          column: 18
        },
        end: {
          line: 39,
          column: 3
        }
      },
      "8": {
        start: {
          line: 41,
          column: 22
        },
        end: {
          line: 41,
          column: 43
        }
      },
      "9": {
        start: {
          line: 44,
          column: 2
        },
        end: {
          line: 44,
          column: 66
        }
      },
      "10": {
        start: {
          line: 46,
          column: 0
        },
        end: {
          line: 48,
          column: 3
        }
      },
      "11": {
        start: {
          line: 47,
          column: 4
        },
        end: {
          line: 47,
          column: 50
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 46,
            column: 17
          },
          end: {
            line: 46,
            column: 18
          }
        },
        loc: {
          start: {
            line: 46,
            column: 23
          },
          end: {
            line: 48,
            column: 1
          }
        },
        line: 46
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 20,
            column: 13
          },
          end: {
            line: 20,
            column: 37
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 20,
            column: 13
          },
          end: {
            line: 20,
            column: 29
          }
        }, {
          start: {
            line: 20,
            column: 33
          },
          end: {
            line: 20,
            column: 37
          }
        }],
        line: 20
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
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "2d7b66bdf3b9da2e6f34a12c6ddd346ca60eeb6c"
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

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _route = _interopRequireDefault(require("./route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (cov_1s9l80stkw.s[0]++, (0, _express.default)());
cov_1s9l80stkw.s[1]++;
app.use((0, _morgan.default)('dev'));
cov_1s9l80stkw.s[2]++;
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
cov_1s9l80stkw.s[3]++;
app.use(_bodyParser.default.json());
cov_1s9l80stkw.s[4]++;
app.use('/api/v1', _route.default);
const port = (cov_1s9l80stkw.s[5]++, (cov_1s9l80stkw.b[0][0]++, process.env.PORT) || (cov_1s9l80stkw.b[0][1]++, 4000)); // Swagger definition

const swaggerDefinition = (cov_1s9l80stkw.s[6]++, {
  info: {
    title: 'REST API for Way Farer App',
    // Title of the documentation
    version: '1.0.0',
    // Version of the app
    description: 'This is the REST API for my product' // short description of the app

  },
  host: `localhost:${port}`,
  // the host or url of the app
  basePath: '/api/v1' // the basepath of your endpoint

}); // options for the swagger docs

const options = (cov_1s9l80stkw.s[7]++, {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml']
}); // initialize swagger-jsdoc

const swaggerSpec = (cov_1s9l80stkw.s[8]++, (0, _swaggerJsdoc.default)(options)); // use swagger-Ui-express for your app documentation endpoint

cov_1s9l80stkw.s[9]++;
app.use('/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerSpec));
cov_1s9l80stkw.s[10]++;
app.listen(port, () => {
  cov_1s9l80stkw.f[0]++;
  cov_1s9l80stkw.s[11]++;
  console.log(`Server started on port ${port}`);
});
var _default = app;
exports.default = _default;