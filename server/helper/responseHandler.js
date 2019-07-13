

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
  static async success(res, message, code, data) {
    res.status(code);
    res.json({
      message,
      data,
    });
  }

  /**
   * @method success
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
