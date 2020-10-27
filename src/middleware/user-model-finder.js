'use strict';

const userCollection = require('../auth/models/user-model-collection.js')

const userModelFinder = {};
const schema = new userCollection();

userModelFinder.createOneUser = async (req, res, next) => {

 
  if( req.body.username){

    let newRecord = await schema.post(req.body);
    res.status(201).json(newRecord);

  }
  else {

    next('post not working, sorry');


  };

};

userModelFinder.getAllUsers = async (req, res, next) => {

  let allData = await schema.get();
  res.status(200).json(allData);
  
};

userModelFinder.getOneUserById = async (req, res, next) => {
  
  let id = req.params.id;
  let singleRecord = await schema.get(id);
  res.status(200).json(singleRecord);

};

userModelFinder.updateOneUserById = async (req, res, next) => {

  let id = req.params.id;
  let recordToUpdate = req.body;
  let updatedRecord = await schema.put(id, recordToUpdate);
  res.status(201).json(updatedRecord);
  
};

userModelFinder.deleteOneUserById = async (req, res, next) => {
  
  let id = req.params.id;
  let deletedRecord = await schema.delete(id);
  res.status(200).json({});

};

module.exports = userModelFinder;