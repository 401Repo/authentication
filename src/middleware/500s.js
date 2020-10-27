'use strict';

module.exports = (err, req, resp, next)=>{

  let output = {
    error: err
  };
  resp.status(500).json(output);
}