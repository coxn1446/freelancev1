const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
//const crypto = require('crypto');
const db = require("../db/index")

module.exports = (app) => {

    app.use('/register', router);

    router.post('/', async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await db.query(
                "INSERT INTO users (username, password) VALUES($1, $2)", 
                [req.body.username,hashedPassword]
            )
            res.redirect('http://localhost:3000')
        } catch (err){
            console.error(err.message)
            res.redirect('http://localhost:3000/register')
        }
    });

}
  