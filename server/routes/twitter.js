const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const oauthSignature = require('oauth-signature')
global.Headers = fetch.Headers;

module.exports = (app) => {
    let timestamp  = Math.floor((new Date()).getTime() / 1000);
    const consumerKey = process.env.REACT_APP_TWITTER_APIKEY;
    const token = process.env.REACT_APP_TWITTER_ACESSTOKEN
    const consumerSecret = process.env.REACT_APP_TWITTER_APIKEYSECRET;
    const tokenSecret = process.env.REACT_APP_TWITTER_ACCESSTOKENSECRET;
    const nonce = process.env.REACT_APP_TWITTER_NONCE;

    app.use('/twitter', router);

    router.post('/twitteroauth', async (req, res) => {
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
        myHeaders.append("Cookie", "guest_id=v1%3A166524611693534220; lang=en");
        
        var requestOptions = {
          method: method,
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(endpointURL, requestOptions)
          .then(response => response.text())
          .then(result => res.redirect(`https://api.twitter.com/oauth/authorize?${result}`))
          .catch(error => console.log('error', error));

    })

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

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`https://api.twitter.com/oauth/access_token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}&oauth_consumer_key=${consumerKey}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${timestamp}&oauth_nonce=${nonce}&oauth_version=1.0&oauth_signature=${encodedSignature}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    });




}