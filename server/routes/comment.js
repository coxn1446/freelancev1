const express = require('express');
const router = express.Router();
const db = require("../db/index")


module.exports = (app) => {

    app.use('/comments', router);

    router.post('/', async (req, res, next) => {
        const date = new Date()
            await db.query(
                "INSERT INTO comments (username, date, post, text, hour) VALUES($1, $2, $3, $4, $5)", 
                [req.session.passport.user.username, date.toDateString(), req.body.postBlog, req.body.commentBlog, date.toTimeString()]
            )
            res.redirect("http://localhost:3000/blog")
    });

    router.get('/', async (req, res, next) => {
        const query = 'SELECT * FROM comments';
        const content = await db.query(query)
        res.send(content.rows)
    });

} 
