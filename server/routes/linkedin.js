const express = require('express');
const router = express.Router();

module.exports = (app) => {

  app.use('/linkedin', router);

  //
  router.post('/', async (req, res, next) => {
      
  });

}