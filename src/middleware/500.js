'use strict';

module.exports = function(err, req, res) {
  const error = err.message ? err.message : err;

  const errorObject = {
    status: 500,
    message: error,
  };
  res.status(errorObject.status).json(errorObject);
};