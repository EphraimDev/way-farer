"use strict";

var cov_uwguk9ize = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\utils\\guid.js";
  var hash = "53a4c03beef08c167e63894ee07b0323149ecb64";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\utils\\guid.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 9,
          column: 20
        }
      },
      "1": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 14,
          column: 79
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        loc: {
          start: {
            line: 6,
            column: 20
          },
          end: {
            line: 10,
            column: 3
          }
        },
        line: 6
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 12,
            column: 2
          },
          end: {
            line: 12,
            column: 3
          }
        },
        loc: {
          start: {
            line: 12,
            column: 20
          },
          end: {
            line: 15,
            column: 3
          }
        },
        line: 12
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "53a4c03beef08c167e63894ee07b0323149ecb64"
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
 * @Unique ID
 */
class GUID {
  static generate() {
    cov_uwguk9ize.f[0]++;
    cov_uwguk9ize.s[0]++;
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  static formGuid() {
    cov_uwguk9ize.f[1]++;
    cov_uwguk9ize.s[1]++;
    return `${GUID.generate() + GUID.generate()}-${GUID.generate()}-${GUID.generate()}-${GUID.generate()}-${GUID.generate()}${GUID.generate()}${GUID.generate()}`;
  }

}

var _default = GUID;
exports.default = _default;