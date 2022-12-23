require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path')

const loaders = require('./server/loaders');

const PORT = process.env.PORT || 80

async function startServer() {

  // Init application loaders
  loaders(app);

  app.use('/', express.static(path.join(__dirname, 'build')))

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();