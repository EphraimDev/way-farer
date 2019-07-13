

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
  static async success(res, status, code, data, message=null) {
    res.status(code);
    res.json({
      status,
      data,
      message
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
