'use strict';


const express = require('express');
const User = require('../models/user-models.js');
const basicAuth = require('../middleware2/basic-auth.js');
const oneRouter = express.Router();


// lets keep these guys here just in case we end up going back to last week for users

// oneRouter.post('/users', userModelFinder.createOneUser);

// oneRouter.get('/users', userModelFinder.getAllUsers);

// oneRouter.get('/users/:id', userModelFinder.getOneUserById);

// oneRouter.put('/users/:id', userModelFinder.updateOneUserById);

// oneRouter.delete('/users/:id', userModelFinder.deleteOneUserById);

// why? i dont know if we need to do the collections etc etc.



module.exports = oneRouter;
