'use strict';

let count = 1;

function loggingMiddleware(req, resp, next) {
  console.log(`Logger has seen ${count} hits to API`);
  next();
  count++;
}

module.exports = loggingMiddleware;
