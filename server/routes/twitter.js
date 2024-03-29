const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const oauthSignature = require('oauth-signature')
global.Headers = fetch.Headers;

module.exports = (app) => {
    //creates a time in ms since the epoch
    let timestamp  = Math.floor((new Date()).getTime() / 1000);

    const consumerKey = process.env.REACT_APP_TWITTER_APIKEY;
    const token = process.env.REACT_APP_TWITTER_ACESSTOKEN
    const consumerSecret = process.env.REACT_APP_TWITTER_APIKEYSECRET;
    const tokenSecret = process.env.REACT_APP_TWITTER_ACCESSTOKENSECRET;
    const nonce = process.env.REACT_APP_TWITTER_NONCE;

    app.use('/twitter', router);

    //uses client token to exchange for a request token
    router.post('/oauth1', async (req, res) => {
        const endpointURL = "https://api.twitter.com/oauth/request_token";
        const method = "POST";

        const parameters = {
            oauth_consumer_key: consumerKey,
            oauth_token: token,
            oauth_nonce: nonce,
            oauth_timestamp: timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0'
        }

        // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
        const encodedSignature = oauthSignature.generate(method, endpointURL, parameters, consumerSecret, tokenSecret)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `OAuth oauth_consumer_key=\"${consumerKey}\",oauth_token=\"${token}\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"${timestamp}\",oauth_nonce=\"${nonce}\",oauth_version=\"1.0\",oauth_signature=\"${encodedSignature}\"`);
        myHeaders.append("Cookie", "guest_id=v1%3A166524611693534220, lang=en");
        
        var requestOptions = {
          method: method,
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(endpointURL, requestOptions)
          .then(response => response.text())
          //uses request token to exchange for an oauth token
          .then(result => res.redirect(`https://api.twitter.com/oauth/authorize?${result}`))
          .catch(error => console.log('error', error));

    })

    //uses the oauth token from /oauth1 result to generate a bearer token
    router.post('/oauth3/:oauth_token/:oauth_verifier', (req, res) => {
        const oauthToken = req.params.oauth_token
        const oauthVerifier = req.params.oauth_verifier;
        const endpointURL = "https://api.twitter.com/oauth/access_token";
        const method = "POST";
        const parameters = {
            oauth_consumer_key: consumerKey,
            oauth_token: token,
            oauth_nonce: nonce,
            oauth_timestamp: timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0'
        }

        // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
        const encodedSignature = oauthSignature.generate(method, endpointURL, parameters, consumerSecret, tokenSecret)

        const myHeaders = new Headers();
        myHeaders.append("Cookie", "guest_id=v1%3A166524611693534220");
        myHeaders.append('Access-Control-Allow-Origin', ['http://localhost:3000', "https://www.freelancev1.com/"]);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        };

        fetch(`https://api.twitter.com/oauth/access_token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}&oauth_consumer_key=${consumerKey}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${timestamp}&oauth_nonce=${nonce}&oauth_version=1.0&oauth_signature=${encodedSignature}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            //de-lints the oauth flow output to something usable/readable
            let finalArray = []
            function cleanUp(string) {
                const index = string.indexOf("=");
                const newString = string.substr(index + 1)
                finalArray.push(newString)
              }
            const array = result.split("&")
            array.forEach(cleanUp)
            req.session.passport.twitter = finalArray
            res.send("Success")

        })
        .catch(error => console.log('error', error));
    });


    //uses the bearer token from the oauth flow to generate user info
    router.get('/user/:username', (req, res) => {
        const username = req.params.username;
        const endpointURL = "https://api.twitter.com/1.1/users/show.json";
        const method = "GET";
        const bearerToken = process.env.REACT_APP_TWITTER_BEARERTOKEN;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearerToken}`);

        var requestOptions = {
        method: method,
        mode: 'cors',
        headers: myHeaders,
        redirect: 'follow'
        };

       fetch(`${endpointURL}?screen_name=${username}`, requestOptions)
       .then(response => response.json())
       .then(result => {res.send(result)})
       .catch(error => console.log('error', error));
    });

    //uses the bearer token from the oauth flow to send a tweet on behalf of a user
    router.post('/sendtweet', (req, res) => {
        const endpointURL = "https://api.twitter.com/2/tweets";
        const method = "POST";
        const tweet = req.body.text
        const oauthToken = req.session.passport.twitter[0]
        const oauthTokenSecret = req.session.passport.twitter[1]

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "guest_id=v1%3A166524611693534220");

        const parameters = {
            oauth_consumer_key: consumerKey,
            oauth_token: oauthToken,
            oauth_nonce: nonce,
            oauth_timestamp: timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0'
        }

        // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
        const encodedSignature = oauthSignature.generate(method, endpointURL, parameters, consumerSecret, oauthTokenSecret);

        myHeaders.append("Authorization", `OAuth oauth_consumer_key=\"${consumerKey}\",oauth_token=\"${oauthToken}\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"${timestamp}\",oauth_nonce=\"${nonce}\",oauth_version=\"1.0\",oauth_signature=\"${encodedSignature}\"`);

        const raw = JSON.stringify({
            "text": `${tweet}`
          });
          
        const requestOptions = {
        method: method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
          
        fetch(endpointURL, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        //redirects to the homepage
        if(process.env.REACT_APP_NODE_ENV === "development"){
            res.redirect('/?status=tweetsent');
        }
        if(process.env.REACT_APP_NODE_ENV === "production"){
            res.redirect('https://www.freelancev1.com/?status=tweetsent');
        }

    });
}