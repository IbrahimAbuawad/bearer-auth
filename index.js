'use strict';

// Start up DB Server
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
server.start(process.env.PORT, () => console.log('server up'));

})
.catch(e => console.error('Could not start server', e.message));

  