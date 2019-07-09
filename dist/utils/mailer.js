"use strict";

var cov_1ubmk0olym = function () {
  var path = "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\utils\\mailer.js";
  var hash = "7826651e29ceb16ae90bf3e547a34f6ed6860970";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\FinchglowGroup\\Desktop\\Andela\\way-farer\\server\\utils\\mailer.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 12
        },
        end: {
          line: 4,
          column: 32
        }
      },
      "1": {
        start: {
          line: 24,
          column: 24
        },
        end: {
          line: 24,
          column: 74
        }
      },
      "2": {
        start: {
          line: 27,
          column: 24
        },
        end: {
          line: 33,
          column: 5
        }
      },
      "3": {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 40,
          column: 7
        }
      },
      "4": {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 38,
          column: 7
        }
      },
      "5": {
        start: {
          line: 37,
          column: 8
        },
        end: {
          line: 37,
          column: 34
        }
      },
      "6": {
        start: {
          line: 39,
          column: 6
        },
        end: {
          line: 39,
          column: 41
        }
      },
      "7": {
        start: {
          line: 51,
          column: 20
        },
        end: {
          line: 55,
          column: 13
        }
      },
      "8": {
        start: {
          line: 57,
          column: 4
        },
        end: {
          line: 61,
          column: 7
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 22,
            column: 2
          },
          end: {
            line: 22,
            column: 3
          }
        },
        loc: {
          start: {
            line: 22,
            column: 44
          },
          end: {
            line: 41,
            column: 3
          }
        },
        line: 22
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 35,
            column: 38
          },
          end: {
            line: 35,
            column: 39
          }
        },
        loc: {
          start: {
            line: 35,
            column: 55
          },
          end: {
            line: 40,
            column: 5
          }
        },
        line: 35
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 50,
            column: 2
          },
          end: {
            line: 50,
            column: 3
          }
        },
        loc: {
          start: {
            line: 50,
            column: 37
          },
          end: {
            line: 62,
            column: 3
          }
        },
        line: 50
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 36,
            column: 6
          },
          end: {
            line: 38,
            column: 7
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 36,
            column: 6
          },
          end: {
            line: 38,
            column: 7
          }
        }, {
          start: {
            line: 36,
            column: 6
          },
          end: {
            line: 38,
            column: 7
          }
        }],
        line: 36
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
      "8": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "7826651e29ceb16ae90bf3e547a34f6ed6860970"
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

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = (cov_1ubmk0olym.s[0]++, process.env.BASE_URL);
/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */

class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */
  static sendMail({
    to,
    subject,
    message
  }) {
    cov_1ubmk0olym.f[0]++;
    // create reusable transporter object
    const transporter = (cov_1ubmk0olym.s[1]++, _nodemailer.default.createTransport(_db.default.mail.smtpConfig)); // setup email data

    const mailOptions = (cov_1ubmk0olym.s[2]++, {
      from: '"Way Farer" <noreply@wayfarer.com>',
      to,
      cc: 'wayfarer@gmail.com',
      subject,
      html: message
    });
    cov_1ubmk0olym.s[3]++;
    transporter.sendMail(mailOptions, (error, info) => {
      cov_1ubmk0olym.f[1]++;
      cov_1ubmk0olym.s[4]++;

      if (error) {
        cov_1ubmk0olym.b[0][0]++;
        cov_1ubmk0olym.s[5]++;
        return console.log(error);
      } else {
        cov_1ubmk0olym.b[0][1]++;
      }

      cov_1ubmk0olym.s[6]++;
      return console.log(info.messageId);
    });
  }
  /**
   * Sends Mail after user succesfully creates an account
   * @method createAccountMessage
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */


  static createAccountMessage(email) {
    cov_1ubmk0olym.f[2]++;
    const message = (cov_1ubmk0olym.s[7]++, `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your account was created succesfully.</p>
      <p><a href='https://${url}/signin'>Login</a> to your account.</p>
      </div>`);
    cov_1ubmk0olym.s[8]++;
    return Mailer.sendMail({
      to: email,
      subject: 'Create Account Successful',
      message
    });
  }

}

var _default = Mailer;
exports.default = _default;