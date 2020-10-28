// Middleware for user can present the token to log in 

//jwt.io to see in it: paste in and show you decoded

// route is slash secret

// bear middleware is decoded and then used to reach user.

// think about the roles for later. 
'use strict';


//      .-=-.) > Im not a duck but i think:
//     /_ _  \  This is tolog in using a token: we decode and retrieve
//     \@ @  /   
//     (_> _)   
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))

// things i need
const base64 = require('base-64');
const users = require('../models/user-models.js');
const jwt = require('jsonwebtoken');

const bearAuth = async (req, res, next) => {

console.log('at bear auth');

  try {

    //step thru the steps:
    // lets just get the token

    let token = req.query.token;
    // console.log(token, 'the token2');
    let decodedBear = jwt.decode(token);

    // console.log(decodedBear, 'the decoded bear token');

    let userToPull = decodedBear.username;
    // console.log(userToPull,'username');

// //     // we jump from here to: 
    let bearValidated = await users.bearValidation(userToPull);


    req.token = bearValidated.getToken();
    req.user = bearValidated;

    next();

  } catch(err) {
    // console.log(err);
    next('Testing secret');
  };

};

module.exports = bearAuth;  