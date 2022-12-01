const { validationResult } = require('express-validator');
const { createResponse, HttpStatusCode, ResponseStatus } = require('./apiResponse');

class BaseValidator {
  static validate(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    // const extractedErrors = [];

    // errors
    //   .array()
    //   .forEach((err) => extractedErrors.push({ [err.param]: err.msg }));


    return createResponse(
      res,
      HttpStatusCode.StatusUnprocessableEntity,
      ResponseStatus.Error,
      errors.array()[0].msg,
    );
  }
}

module.exports = BaseValidator;
