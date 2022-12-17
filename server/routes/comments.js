const express = require('express');
const router = express.Router();
const db = require("../db/index")
const fetch = require("node-fetch");
global.Headers = fetch.Headers;


module.exports = (app) => {

    app.use('/comments', router);

    //inserts a new comment into the database
    router.post('/', async (req, res, next) => {
        const date = new Date()
        const query = "INSERT INTO comments (user_id, date, post, text, hour) VALUES($1, $2, $3, $4, $5)"
        await db.query(query, [req.session.passport.user.id, date.toDateString(), req.body.postBlog, req.body.commentBlog, date.toTimeString()])
        res.redirect("http://localhost:3000/blog")
    });


    //pulls all comments from the database
    router.get('/:blog', async (req, res, next) => {
        const query = 'SELECT * FROM comments WHERE post = $1';
        const content = await db.query(query, [req.params.blog])
        res.send(content.rows)
    });

    //increments the number of likes of a specific comment by 1
    router.put('/like/:commentID', async (req, res, next) => {
        const query = 'UPDATE comments SET num_of_likes = num_of_likes + 1 WHERE id = ($1)';
        await db.query(query,[req.params.commentID])
        res.end()
    });

    //decrements the number of likes of a specific comment by 1
    router.put('/unlike/:commentID', async (req, res, next) => {
        const query = 'UPDATE comments SET num_of_likes = num_of_likes - 1 WHERE id = ($1)';
        await db.query(query,[req.params.commentID])
        res.end()
    });

    //deletes a comment from both the comments table and the likes table
    router.delete('/:commentID', async (req, res, next) => {
        const query = "DELETE FROM comments WHERE id = $1";
        await db.query(query,[req.params.commentID])
        const query2 = "DELETE FROM likes WHERE comment_id = $1"
        await db.query(query2,[req.params.commentID])

        res.end()
    });

} 
