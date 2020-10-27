'use strict';


//      .-=-.) > Im not a duck but i think:
//     /_ _  \  I just need this hit when i try to sign in and already have: a saved
//     \@ @  /   user to compare in mongodb and b: a saved hashed password to compare an incoming string
//     (_> _)   
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))

// things i need
const base64 = require('base-64');
const users = require('../models/user-models.js');



const basicAuth = async (req, res, next) => {

//console.log('at basic auth');

  try {

    // step thru the steps:
    // read header

    // settup the headers automatically: https://stackoverflow.com/questions/24000580/how-does-req-headers-authorization-get-set
    let authHeader = req.headers.authorization;
    console.log({authHeader}, 'this is my authH');
    

    // lets split it because we need everything after the space.
    let encoded = authHeader.split(' ')[1];
    console.log({encoded});

    // we decode the rest and should get the proper info to pass:
    let decoded = base64.decode(encoded);
    console.log({decoded});

    //get the username and password
    let [usr, pass] = decoded.split(":");
    console.log('user and pass', [usr, pass]);


    // we jump from here to: 
    let validated = await users.validation(usr, pass);
    // console.log({validated});


    req.token = validated.getToken();
    req.user = validated;

    next();

  } catch(err) {
    // console.log(err);
    next('Login error');
  };

};

module.exports = basicAuth;