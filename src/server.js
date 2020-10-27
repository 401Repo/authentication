'use strict';

//      .-=-.) > Im not a duck but i think:
//     /_ _  \  This is the heart of the program.
//     \@ @  /  nothing happens here, we just refer everything to land here.
//     (_> _)
//      `)(_
//      /((_`)_,
//      \__(/-"
//     __|||__
//jgs ((__|__))

// dependencies

const express = require('express');
const app = express();

// error pages and logger

const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500s.js');
const loggingMiddleware = require('./middleware/logger.js');
const timeStamp = require('./middleware/timeStamp.js');


// express specific
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(loggingMiddleware);
app.use(timeStamp);

// routes

const oneRouter = require('./auth/routes/router.js');
app.use('/api/v1', oneRouter);

// ERROR PAGES

app.use(notFound);
app.use('*', serverError);

function start(PORT){
  app.listen(PORT, () => console.log('Listening on: ', PORT))
}

module.exports = {
  start: start,

  app
}
