'use strict';

//Duck by Joan Stark
//                 ,-.
//         ,      ( {o\
//         {`"=,___) (`~
//          \  ,_.-   )
//jgs  ~^~^~^`- ~^ ~^ '~^~^~^~
//         I need Middleware to find my cat and product model finders
// ..........I dont care about patch..........
//
const userModelFinder = require('../../middleware/user-model-finder.js');
const express = require('express');
const oneRouter = express.Router();

// user:

oneRouter.post('/users', userModelFinder.createOneUser);

oneRouter.get('/users', userModelFinder.getAllUsers);

oneRouter.get('/users/:id', userModelFinder.getOneUserById);

oneRouter.put('/users/:id', userModelFinder.updateOneUserById);

oneRouter.delete('/users/:id', userModelFinder.deleteOneUserById);

module.exports = oneRouter;
