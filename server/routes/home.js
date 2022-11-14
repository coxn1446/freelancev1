const express = require('express');
const router = express.Router();


module.exports = (app) => {

    app.use('/home', router);

    router.get('/', (req, res, next) => {
        console.log(req.sessionID)
    });

} 
