const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
global.Headers = fetch.Headers;

module.exports = (app) => {
    const clientID = process.env.REACT_APP_FACEBOOK_CLIENTID
    const clientSecret = process.env.REACT_APP_FACEBOOK_CLIENTSECRET
    const redirectURL = process.env.REACT_APP_FACEBOOK_REDIRECTURL

    app.use('/facebook', router);

    router.get('/oauth2/:code/', (req, res) => {
        const facebookCode = req.params.code
        const endpointURL = 'https://graph.facebook.com/v15.0/oauth/access_token';
        const method = "GET";

        const myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');

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

    router.get('/user', (req, res) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${req.session.passport.linkedin.access_token}`);
      myHeaders.append("Cookie", "lidc=\"b=TB36:s=T:r=T:a=T:p=T:g=3818:u=800:x=1:i=1669172672:t=1669229132:v=2:sig=AQHzMAi--L11-Rt61qkZhtewAIiERItX\"; bcookie=\"v=2&cb02b6b0-649a-42a1-8383-a5ab974c0957\"");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))", requestOptions)
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));
      
    })
}