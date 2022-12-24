require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path')

const loaders = require('./server/loaders');

const PORT = process.env.PORT || 80

async function startServer() {

  // Init application loaders
  loaders(app);

  if(process.env.REACT_APP_NODE_ENV === "production"){
  app.use('/', express.static(path.join(__dirname, 'build')))
  app.use('/login', express.static(path.join(__dirname, 'build')))
  app.use('/register', express.static(path.join(__dirname, 'build')))
  app.use('/blog', express.static(path.join(__dirname, 'build')))
  app.use('/contact', express.static(path.join(__dirname, 'build')))
  app.use('/privacy', express.static(path.join(__dirname, 'build')))
  app.use('/twitter', express.static(path.join(__dirname, 'build')))
  app.use('/facebook', express.static(path.join(__dirname, 'build')))
  app.use('/linkedin', express.static(path.join(__dirname, 'build')))
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  })
}

startServer();