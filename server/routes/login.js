const express = require('express');
const router = express.Router();
const qs = require('querystring');
//const db = require("../db/index")


module.exports = (app, passport) => {

  app.use('/login', router);

  /*router.get("/", async (req, res) => {
    const query = await db.query('SELECT * FROM users WHERE email = $1', [req.query.email]);
    const users = query.rows[0].email
    console.log(req.query)
    res.send(users)
  });*/

  router.post('/', passport.authenticate('local', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/login'
  }));


  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      var params = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        returnTo: 'http://localhost:3000/login'
      };
      res.redirect(process.env.REACT_APP_AUTH0_DOMAIN + '/v2/logout?' + qs.stringify(params));
    });
  });

} 
