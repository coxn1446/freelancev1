require("dotenv").config();
const express = require('express');
const app = express();

const loaders = require('./loaders');

const PORT = process.env.PORT || 80

async function startServer() {

  // Init application loaders
  loaders(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();