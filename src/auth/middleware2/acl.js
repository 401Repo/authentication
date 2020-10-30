'use strict';

const { update } = require('../models/user-models');

// what are the capavilities within the token

// Do the capabilities meet the requirements for this route

// function currying: a function that returns another function

module.exports = function (capability) {


  console.log(capability,'capability in route');


  if(capability == 'read'){
    return function (req, res, next) {

      try {

        //   let capabilitiesString = req.body._raw.split('capabilities')[0];
        // let caps = req._parsedOriginalUrl.search;

        // let read = caps.substring(caps.length - 4);

        // console.log(read);
        let role = req.user.role;


        if (role === 'user' || role === 'admin' || role === 'editor'){
          next();
        } else {
          next('Access Denied at acl: cannot read');
        }

      } catch (e) {
        console.log(e);
        next('Invalid token at acl');
      }
    }
  }
  /// end of read

  if(capability == 'update'){
    return function (req, res, next) {

      try {

        //   let capabilitiesString = req.body._raw.split('capabilities')[0];
        // let caps = req._parsedOriginalUrl.search;

        // let read = caps.substring(caps.length - 4);

        // console.log(read);
        let role = req.user.role;


        if (role === 'admin' || role === 'editor'){
          next();
        } else {
          next('Access Denied at acl: cannot update');
        }

      } catch (e) {
        console.log(e);
        next('Invalid token at acl');
      }
    }
  }

  if(capability == 'create'){
    return function (req, res, next) {

      try {

        //   let capabilitiesString = req.body._raw.split('capabilities')[0];
        // let caps = req._parsedOriginalUrl.search;

        // let read = caps.substring(caps.length - 4);

        // console.log(read);
        let role = req.user.role;


        if (role === 'admin'){
          next();
        } else {
          next('Access Denied at acl: cannot create');
        }

      } catch (e) {
        console.log(e);
        next('Invalid token at acl create');
      }
    }
  }

  if(capability == 'delete'){
    return function (req, res, next) {

      try {

        //   let capabilitiesString = req.body._raw.split('capabilities')[0];
        // let caps = req._parsedOriginalUrl.search;

        // let read = caps.substring(caps.length - 4);

        // console.log(read);
        let role = req.user.role;


        if (role === 'admin'){
          next();
        } else {
          next('Access Denied at acl: cannot delete');
        }

      } catch (e) {
        console.log(e);
        next('Invalid token at acl create');
      }
    }
  }
  /// end of delete


}
