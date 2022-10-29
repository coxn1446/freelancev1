const express = require('express');
const router = express.Router();

module.exports = (app) => {

  app.use('/linkedin', router);

  // Registration Endpoint
  router.post('/', async (req, res, next) => {
      
  });

}