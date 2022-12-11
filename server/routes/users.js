const express = require('express');
const router = express.Router();
const db = require("../db/index")


module.exports = (app) => {

    app.use('/users', router)

    router.get('/:user', async (req, res, next) => {
        const user = req.params.user;
        const query = 'SELECT profilepic FROM users WHERE username = $1';
        const content = await db.query(query, [user])
        res.send(content.rows[0])
    });

} 
