const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
global.Headers = fetch.Headers;

module.exports = (app) => {
    const clientID = process.env.REACT_APP_FACEBOOK_CLIENTID
    const clientSecret = process.env.REACT_APP_FACEBOOK_CLIENTSECRET
    const redirectURL = process.env.REACT_APP_FACEBOOK_REDIRECTURL

    app.use('/facebook', router);

    //exchanges oAuth token for Access token
    router.get('/oauth2/:code/', (req, res) => {
        const facebookCode = req.params.code
        const endpointURL = 'https://graph.facebook.com/v15.0/oauth/access_token';
        const method = "GET";

        const myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', ['http://localhost:3000',"https://www.freelancev1.com/"]);

        const requestOptions = {
        method: method,
        redirect: 'follow'
        };

        fetch(`${endpointURL}?client_id=${clientID}&redirect_uri=${redirectURL}&client_secret=${clientSecret}&code=${facebookCode}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            req.session.passport.facebook = result
            res.send("Success")
        })
        .catch(error => console.log('error', error));
    });
}