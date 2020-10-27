'use strict';

let time = Date(Date.now());
let timeT = time.toString();

function timeStamp(req, resp, next) {
  console.log(`Time request was made: ${timeT}`);
  next();
}

module.exports = timeStamp;

