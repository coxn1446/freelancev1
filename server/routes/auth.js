const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const db = require("../db/index")


module.exports = (app, passport) => {

  app.use('/auth', router);

  router.post('/register', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await db.query(
            "INSERT INTO users (username, password, firstname, lastname, phonenumber) VALUES($1, $2, $3, $4, $5)", 
            [req.body.username,hashedPassword, req.body.firstname, req.body.lastname, req.body.phonenumber]
        )
        res.redirect('http://localhost:3000/login')
    } catch (err){
        console.error(err.message)
        res.redirect('http://localhost:3000/register')
    }
});

  router.post('/login', passport.authenticate('local', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/login'
  }));

  router.get('/login', (req, res, next) => {
    res.send(req.session)
  });

  router.get('/test', (req, res, next) => {
    req.session.token = 'hello'
    console.log(req.session)
    res.end()

  });



  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('http://localhost:3000/login');
    });
  });

} 
