'use strict';

//      .-=-.) > Im not a duck but i think:
//     /_ _  \  That this is the entry to the program.
//     \@ @  /  so not much to see here.
//     (_> _)
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))

require('dotenv').config();
const PORT =  process.env.PORT;

const server = require('./src/server.js');
const mongoose = require('mongoose');

const mongoLink = process.env.mongoLink;

mongoose.connect(mongoLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

server.start(PORT);
