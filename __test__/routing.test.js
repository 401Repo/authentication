'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');
const server = require('../src/server.js');
const req = supergoose(server.app);

let testToken;

describe('Testing my routes work', () => {



  it('lets use signup to create a new user.', async () => {

    let user = {
      username: "Clawmella",
      password: "Harris",
    };

    let res = await req.post('/api/v1/signup').send(user);
    let validToken = await jwt.verify(res.text, process.env.MYCODE);
    console.log(validToken, 'this is valid token');
    testToken = validToken.token;
    expect(validToken.username).toEqual("Clawmella");
    expect(res.status).toEqual(201);
    
  });

  it('signin will login as a user', async () => {

    let res = await req.post('/api/v1/signin').auth("Clawmella", "Harris");
    expect(res.body.user._id).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toEqual("Clawmella");
    expect(res.status).toEqual(201);
  });

  it('secret will login as a user', async () => {

    let res = await req.get(`/api/v1/secret?token=${testToken}`);
    expect(res.status).toEqual(500);
  });

  it('A bad route will give me an error', async () => {

    let res = await req.get('/nope').send('Hello world!');
    expect(res.status).toEqual(404);
    
  });

  it('error when the signup route is hit with a bad input', async () => {

    let obj = {
      student: "bob",
      lastname: "bobson"
    };

    let res = await req.post('/api/v1/signup').send(obj);
    console.log(res.error);
    expect(res.status).toEqual(401);
    
  });

  it('no input hits my 500 error', () => {
    
  });
  
});