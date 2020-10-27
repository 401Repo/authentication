'use strict';

module.exports = (req, res, next) => {

  let output = {
    message: '404 error',
  }
  res.status(404).json(output);

};
