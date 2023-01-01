const express = require('express');
const router = express.Router();
const db = require("../db/index")


module.exports = (app) => {

    app.use('/ads', router);

    //inserts a new ad into the database
    router.post('/', async (req, res, next) => {
        //checks to see if a ad for that date already exists
        const result = await db.query("SELECT date FROM ads WHERE date = $1", [req.body.dateAds])
        if( Object(result.rows).length !== 0){
            if(process.env.REACT_APP_NODE_ENV === "development"){
                res.redirect(`/ads?status=Date has already been chosen`)
            }
            if(process.env.REACT_APP_NODE_ENV === "production"){
                res.redirect(`https://www.freelancev1.com/ads?status=Date has already been chosen`)
            }
        }
        //if date is available, inserts info from HTML form into the database
        if( Object(result.rows).length === 0){
            let banner1 = false;
            let banner2 = false;
            if(req.body.dimmensionsAds728x90){
                banner1 = true
            }
            if(req.body.dimmensionsAds300x250){
                banner2 = true
            }
            const query = "INSERT INTO ads (subject, date, desktop_banner, mobile_banner, url, contact, pay_method, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)"
            await db.query(query, [req.body.brandAds, req.body.dateAds, banner1, banner2, req.body.urlAds, req.body.contactAds, req.body.contactAds, req.session.passport.user.id])

            if(process.env.REACT_APP_NODE_ENV === "development"){
                res.redirect("/ads?status=Request sent successfully!")
            }
            if(process.env.REACT_APP_NODE_ENV === "production"){
                res.redirect("https://www.freelancev1.com/ads?status=Reauest sent successfully!")
            }
        }

    });

} 
