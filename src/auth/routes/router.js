'use strict';

//      .-=-.) > Im not a duck but i think:
//     /_ _  \  This is nothing like the previous week.
//     \@ @  /  So this router in "in and out" paths and retrieve
//     (_> _)
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))


//Things i need:
const express = require('express');
const User = require('../models/user-models.js');
const basicAuth = require('../middleware2/basic-auth.js');
const oneRouter = express.Router();

//      .-=-.) > Im not a duck but i think:
//     /_ _  \  Sign up path: we take a username and password. Password is vcripted
//     \@ @  /  and then saved so that the password isint saved to the db but can 
//     (_> _)   be has bcryted compared later. username
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))
oneRouter.post('/signup', async function (req, res, next) {

  try {

    //the req has the username and password sent to sign up with
    let obj = {
      username: req.body.username,
      password: req.body.password,
    };

    // A new instance of the user schema, containing new user sign in data
    let newRecord = await new User(obj);
    console.log({newRecord}, 'The object');

    // Add the new user to the database
    let newUser = await newRecord.save();
    console.log({newUser}, 'the new user');

    // Get a new JWT token
    let token = newRecord.getToken();
    console.log({token}, 'This is the token');

    // respond with 201 and send the token back
    res.status(201).send(token);

  } catch(err) {

    console.log('404 error in auth router')
    res.status(401).send('Signup failed, please try again.');
    next(err.message);

  };

});

//      .-=-.) > Im not a duck but i think:
//     /_ _  \  signing in
//     \@ @  /  To know: i need my headers and the corrrect strings to be compared. 
//     (_> _)   
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))

oneRouter.post('/signin', basicAuth, async function (req, res, next) {

// I have to go to basicAuth before landing here else i get the error.

    //console.log('on the sign in route');
  try {

    let validated = {
      user: req.user,
      token: req.token,
      message: "You're in!!!",
      message1: "       ^",
      message2: "      /|\\",
      message3: "     / | \\",
      message4: "    /  |  \\",
      message5: "KCK '-.|.-'"
    }
    

 
    res.cookie = req.token;
    res.token = req.token;
    //send my resp back 
    res.status(201).json(validated);

  } catch(err) {

    res.status(401).send('Try your username and password again');
    next(err.message);
    
  };

});


  oneRouter.get('/users', async function (req, res, next) {

    console.log('in path users');

    try {
  

      // just empty find
      let users = await User.find();
      res.status(201).json(users);
    } catch(err) {
  
      res.status(500).send('Server error, could not get users');
      next(err.message);
  
    };

  });

// i need a get route users to get users. This to geet to yesterday.

// today get token and ??????

// create secret path

module.exports = oneRouter;