const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

module.exports = (app) => {

  app.use('/register', router);

  // Registration Endpoint
  router.post('/', async (req, res, next) => {
      try {
          const hashedPassword = await bcrypt.hashedPassword(req.body.password, 10)
          console.log(hashedPassword)
      } catch{
          console.log("There was an error")  

      }
  });

  router.get('/', async (req, res, next) => {
      res.send("Hello")

});

} 