const express = require('express');
const router = express.Router();
const db = require("../db/index")


module.exports = (app) => {

    app.use('/likes', router);

    //inserts a new like into the database
    router.post('/:commentID', async (req, res, next) => {
        const query = "INSERT INTO likes (user_id, comment_id) VALUES($1, $2)";
        await db.query(query,[req.session.passport.user.id,req.params.commentID]);
        res.end()
    });

    //deletes a like from the database
    router.delete('/:commentID', async (req, res, next) => {
        const query = "DELETE FROM likes WHERE user_id = $1 AND comment_id = $2";
        await db.query(query, [req.session.passport.user.id,req.params.commentID])
        res.end()
});

    //determines whether a user has liked a specific comment
    router.get('/:commentID', async (req, res, next) => {
        const query = 'SELECT user_id FROM likes WHERE comment_id = $1';
        const result = await db.query(query,[req.params.commentID])

        res.send(result.rows)
    });

} 
