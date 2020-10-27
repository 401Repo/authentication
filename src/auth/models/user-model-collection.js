'use strict';

const schema = require('./user-schema.js');
const errorHandler = require('../../middleware/404.js');

class userModel {

  // .find()
  get(id){
    if(!id){
      return schema.find({});
    } else {
      return schema.findById(id);
    }
  }

  // .save()
  post(newRecord){
    let record = new schema(newRecord);
    return record.save();
  }

  // .findOneByIdAndUpdate()
  put(id, record){
    if(!id){
      errorHandler();
    } else if(id, record){
      return schema.findByIdAndUpdate(id, record, {new: true});
    }
  }

  // .findOneByIdAndDelete()
  delete(id){
    if(!id){
      errorHandler();
    } else if (id){
      return schema.findByIdAndDelete(id);
    }
  }

}

module.exports = userModel;
