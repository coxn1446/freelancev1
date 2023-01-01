const express = require('express');
var methodOverride = require('method-override')
const router = express.Router();
const db = require("../db/index")


module.exports = (app) => {

    app.use('/users', router)

    //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.
    app.use(methodOverride('_method'))

    //pulls user info from database
    router.get('/:userID', async (req, res, next) => {
        const userID = req.params.userID;
        const query = 'SELECT * FROM users WHERE id = $1';
        const content = await db.query(query, [userID])
        res.send(content.rows[0])
    });

    //adds email to a user profile
    router.post('/subscribe', async (req, res, next) => {
        const userID = req.session.passport.user.id
        const email = req.body.emailSubscribeBlog

        const query = 'UPDATE users SET email = $1 WHERE id = $2';
        await db.query(query,[email, userID])
        if(process.env.REACT_APP_NODE_ENV === "development"){
            res.redirect('/blog')
        }
        if(process.env.REACT_APP_NODE_ENV === "production"){
            res.redirect('https://www.freelancev1.com/blog')
        }

    });

} 
