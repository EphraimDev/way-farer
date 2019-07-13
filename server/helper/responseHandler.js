

/**
 * @exports
 * @class JSONResponse
 */
class JSONResponse {
  /**
   * @method success
   * @memberof JSONResponse
   * @param {object} user
   */
  static async success(res, status, code, data) {
    res.status(code);
    res.json({
      status,
      data,
    });
  }

  /**
   * @method auth
   * @memberof JSONResponse
   * @param {object} user
   */
  static async auth(res, status, code, token, data) {
    res.status(code);
    res.json({
      status,
      token,
      data,
    });
  }

  /**
   * @method error
   * @memberof JSONResponse
   * @param {object} user
   */
  static async error(res, status, code, error) {
    res.status(code);
    res.json({
      status,
      error,
    });
  }
}

export default JSONResponse;
