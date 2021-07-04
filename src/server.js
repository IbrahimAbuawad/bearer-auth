'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
const authRoutes = require('./auth/router.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/signup',authRoutes);
app.post('/signin',authRoutes);


app.get('/', (req, res) => {
res.send('hello');
});

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};