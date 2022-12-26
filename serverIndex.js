require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')
//const https = require('https')
//const http = require('http')

const loaders = require('./server/loaders');

const httpsPORT = process.env.PORT || 443;
const httpPORT = process.env.PORT || 80;
//const hostname = 'freelancev1.com'

/*const httpsOptions = {
  cert: fs.readFileSync('server/freelancev1_com.crt','utf8'),
  ca: [fs.readFileSync('server/freelancev1_com1.ca-bundle', 'utf8'),fs.readFileSync('server/freelancev1_com2.ca-bundle','utf8')],
  key: fs.readFileSync('server/freelancev1_com.key', 'utf8')
}*/

//const httpServer = http.createServer(app)
//const httpsServer = https.createServer(httpsOptions, app)

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

  /*if(process.env.REACT_APP_NODE_ENV === 'development'){
    httpServer.listen(httpPORT, function(){
      console.log(`Server is running on ${httpPORT}`)
    });
  }*/

  if(process.env.REACT_APP_NODE_ENV === "development"){
  app.listen(httpPORT)
  }

}

startServer()