const express = require('express');
const router = express.Router();


module.exports = (app) => {

    app.use('/social', router);

    router.get('/', async (req, res, next) => {
    });

} 
