const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const oauthSignature = require('oauth-signature')
global.Headers = fetch.Headers;

module.exports = (app) => {
    const clientID = process.env.REACT_APP_LINKEDIN_CLIENTID
    const clientSecret = process.env.REACT_APP_LINKEDIN_CLIENTSECRET
    const redirectURL = process.env.REACT_APP_LINKEDIN_REDIRECTURL

    app.use('/linkedin', router);

    router.post('/oauth3/:code/', (req, res) => {
        const linkedinCode = req.params.code
        const endpointURL = 'https://www.linkedin.com/oauth/v2/accessToken';
        const method = "POST";

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "x-www-form-urlencoded");
        myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');

        const requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow',
        };

        fetch(`${endpointURL}?grant_type=authorization_code&code=${linkedinCode}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${redirectURL}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            req.session.passport.linkedin = result
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