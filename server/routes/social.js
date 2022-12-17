const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


module.exports = (app) => {

    app.use('/home', router);

    router.get('/', async (req, res, next) => {
    });

} 
