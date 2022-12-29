require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')
var https = require('https');


const loaders = require('./server/loaders');

const httpsPORT = process.env.PORT || 443;
const httpPORT = process.env.PORT || 4000;

async function startServer() {

  // Init application loaders
  loaders(app);

  if(process.env.REACT_APP_NODE_ENV === "production"){
    app.use((req, res, next) => {
      req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
  })

    app.use('/', express.static(path.join(__dirname, 'build')))
    app.use('/login', express.static(path.join(__dirname, 'build')))
    app.use('/register', express.static(path.join(__dirname, 'build')))
    app.use('/blog', express.static(path.join(__dirname, 'build')))
    app.use('/contact', express.static(path.join(__dirname, 'build')))
    app.use('/privacy', express.static(path.join(__dirname, 'build')))
    app.use('/twitter', express.static(path.join(__dirname, 'build')))
    app.use('/facebook', express.static(path.join(__dirname, 'build')))
    app.use('/linkedin', express.static(path.join(__dirname, 'build')))

    app.listen(httpsPORT)
  }


  if(process.env.REACT_APP_NODE_ENV === "development"){
    app.listen(httpPORT)
  }

}

startServer()