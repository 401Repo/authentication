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


// for basic oauth

const superagent = require('superagent');

//Things i need:
const express = require('express');
const User = require('../models/user-models.js');
const basicAuth = require('../middleware2/basic-auth.js');
const bearAuth = require('../middleware2/bearer.js');
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



oneRouter.get('/secret', bearAuth, async function (req, res, next) {

  // I have to go to basicAuth before landing here else i get the error.
  
      console.log('in the bear route');
    try {
  
      let bearValidated = {
        user: req.user,
        token: req.token,
        message: "You're in bear!!!",
        message1:"()=()   ()-()   ()=()   ()-()",
        message2:`('Y')   (':')   (^;^)   ('&')`,
        message3:`q . p   d . b   C   C   c . c`,
        message4:`()_()   ()_()   ()_()   ()=()`,

      }
  
      res.cookie = req.token;
      res.token = req.token;
      //send my resp back 
      res.status(201).json(bearValidated);
  
    } catch(err) {
  
      res.status(401).send('Try your bear token again');
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
/////////


///Oauth



///////////


oneRouter.get('/oauth', async (req, res, next) => {
  let code = req.query.code; // oauth gives us a code to make a request for the token

  let tokenURL = 'https://github.com/login/oauth/access_token';
  let remoteUserURL = 'https://api.github.com/user';

  try {

    // STEP#3 first exchange an access code for an access token
    const access_token = await exchangeCodeForToken(code);

    // STEP#4 Now that we have the toke, we can use this to get data about the user
    const userData = await getRemoteUserData(access_token);

    // STEP#5 Using our userData from the AUth Provider, we can create our own User to relate any resources this user creates
    //  the goal here is to send back a token from this user we created.
    const token = await createAPIUser(userData);

    res.send(token);
  } catch (e) {
    console.log(e);

    res.status(400).send("Something went wrong");
  }


  // confirm that a request was made and get a token for user data
  async function exchangeCodeForToken(code) {
    let tokenRequest = await superagent.post(tokenURL)
      .send({
        code: code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      });

    let access_token = tokenRequest.body.access_token;

    return access_token;
  }

  // use the access_token to request information about the user
  async function getRemoteUserData(token) {
    console.log('token from code', token);
    let userRequest = await superagent.get(remoteUserURL)
      .set('User-Agent', 'express') // specific to githubs requirement for requesting data
      .set('Authorization', `token ${token}`);

    let user = userRequest.body;

    return user;
  }

  // This creates our own user and creates a token
  async function createAPIUser(userdata) {
    const newUser = new Users({ username: userdata.login });
    const savedUser = await newUser.save();

    const token = savedUser.generateToken();

    return token;
  }
});







// i need a get route users to get users. This to geet to yesterday.

// today get token and ??????

// create secret path

module.exports = oneRouter;