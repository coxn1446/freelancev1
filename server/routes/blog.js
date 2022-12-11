const express = require('express');
const router = express.Router();
const db = require("../db/index")


module.exports = (app) => {

    app.use('/blog', router)

    router.get('/anatomy', async (req, res, next) => {
        const query = 'SELECT content FROM blogs WHERE title = $1';
        const content = await db.query(query, ["Anatomy"])
        res.send(content.rows[0].content)
    });

    router.get('/jobs', async (req, res, next) => {
        const query = 'SELECT content FROM blogs WHERE title = $1';
        const content = await db.query(query, ["Jobs"])
        res.send(content.rows[0].content)
    });

    router.get('/collecting', async (req, res, next) => {
        const query = 'SELECT content FROM blogs WHERE title = $1';
        const content = await db.query(query, ["Collecting"])
        res.send(content.rows[0].content)
    });

} 
