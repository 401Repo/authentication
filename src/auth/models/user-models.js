'use strict';

//      .-=-.) > Im not a duck but i think:
//     /_ _  \  This is like our collections and schema to create a model last week
//     \@ @  /  we need this for the mongo orm interface.
//     (_> _)   
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))


//Things i need:
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// TODO: change to unique username when can

const users = new mongoose.Schema({
  username: { type: String, required: true, unique : true },
  password: { type: String, required: true },
});

// else we dont change the pass string
users.pre('save', async function () {
  const salt = 8;
  this.password = await bcrypt.hash(this.password, salt);
});

users.methods.getToken = function () {
  let token = jwt.sign({ username: this.username }, process.env.MYCODE);
  return token;
};





users.statics.validation = async function (usr, pass) {

    console.log('at validation');
    console.log(usr, pass, 'the pased in vals')

// need to capitalize: I DONT KNOW WHY it it wont just work as is.

    usr = usr.charAt(0).toUpperCase()+usr.slice(1);
    console.log('user passed in: ', usr);

    pass = pass.charAt(0).toUpperCase()+pass.slice(1);
    console.log('password passed in', pass);


    // we make sure user exist, and if it does we need's it info... wich is why i needs
    //to be aunique name in our mongo
  const user = await this.findOne({ username: usr });
  console.log({user}), ' was fround from the db';

//   console.log('lets try to salt the pass:');

// console.log('this is the password from user: ', user.password);

  let match = await bcrypt.compare(pass, user.password);
  console.log({match}, 'is it a match?');

  if (match) {
    return user;
  }
  else {
    return 'Something went wrong: passwords dont match';
  };

};

users.statics.bearValidation = async function (userToPull) {

  console.log(userToPull, ' at bear validation');

// need to capitalize: I DONT KNOW WHY it it wont just work as is.

userToPull = userToPull.charAt(0).toUpperCase()+userToPull.slice(1);
  console.log('user passed in at bear 83: ', userToPull);

  // we make sure user exist, and if it does we need's it info... wich is why i needs
  //to be aunique name in our mongo
const user = await this.findOne({ username: userToPull });
console.log({user});

//   console.log('lets try to salt the pass:');

// console.log('this is the password from user: ', user.password);

  return user;


};






module.exports = mongoose.model('users', users);

