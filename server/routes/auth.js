const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const db = require("../db/index")
const fetch = require("node-fetch");


module.exports = (app, passport) => {

  app.use('/auth', router);

  router.post('/register', async (req, res, next) => {
    //checks to see if a username already exists
    const result = await db.query(
      "SELECT username FROM users WHERE username = $1", [req.body.username]
    )
    if( Object(result.rows).length !== 0){
      res.redirect(`http://localhost:3000/register?status=Username has already been chosen`)
    }
    //this code searches through all available photos in the picsum database, 
    //pushes it into a single array here and then chooses one photo at random
    if( Object(result.rows).length === 0){
      let urlArray = []
      for(let row1 = 1; row1 < 11; row1++) {
        await fetch(`https://picsum.photos/v2/list?page=${row1}&limit=100`).then((response) => response.json())
        .then((data) => {
          for (let row = 0; row < data.length; row++) {
            const string = (data[row].download_url).split('https://picsum.photos/id/')
            const string2 = "https://picsum.photos/id/"
            const index = string[1].indexOf("/")
            const finalString = string2.concat(string[1].substring(0,index),"/200")
            urlArray.push(finalString)
          }
        })
      }
      let randomNumber = Math.floor((Math.random() * urlArray.length))
      const profilePicURL = urlArray[randomNumber]
    
      //registers a user using inputs from register form
      try {
          //puts password through hash function so database can store the hash
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          await db.query(
              "INSERT INTO users (username, password, firstname, lastname, phonenumber, profilepic) VALUES($1, $2, $3, $4, $5, $6)", 
              [req.body.username, hashedPassword, req.body.firstname, req.body.lastname, req.body.phonenumber, profilePicURL]
          )
          res.redirect('http://localhost:3000/login')
      } catch (err){
          console.error(err.message)
          res.redirect('http://localhost:3000/register')
      }
    }
  });

  //uses passport library to authenticate users
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      // Redirect if it fails
      if (!user) { 
        return res.redirect(`http://localhost:3000/login?status=${info.message}`); 
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        // Redirect if it succeeds
        return res.redirect('http://localhost:3000');
      });
    })(req, res, next);
  });

  //sends session data around the app
  router.get('/login', (req, res, next) => {
    res.send(req.session)
  });

  //uses passport library to log a user out, deleting all session data in the process
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('http://localhost:3000/login');
    });
  });

} 
