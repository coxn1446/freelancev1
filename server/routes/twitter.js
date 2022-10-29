const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const app = express();
const OAuth = require('oauth-1.0a')
const crypto = require('crypto');
const request = require('request')
global.Headers = fetch.Headers;

const oauth = OAuth({
    consumer: {
        key: 'xIUAx8Pt2gjsfS4v9GKtBg1VC',
        secret: 'GtRO4aLFtnFahB64avTNg2CP4w7352ayxo2G3nxkg6xQF7ua3A',
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    },
})

let twitterOAuthRequestBody

module.exports = (app) => {

app.use('/twitter', router);

// create a GET route
app.get('/express_backend/:name', async (req, res) => {
    const name = req.params.name;
    try {
    const twitterCall = await fetch(`https://api.twitter.com/2/users/by/username/${name}`, {
        method: 'GET',
        headers:{
            Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAMnLhwEAAAAAWgsVks20KdAOZ2yzYb4xV9aWmDw%3DcRzeXtV9VZa94niCM0aF5jUvrXdTfoxx5wml35JbLMnCtZbG2q",
            Cookie: "guest_id=v1%3A166524611693534220"
        }, 
        redirect: 'follow'
    })
    const data = await twitterCall.json();
    return res.json(data);
    } catch (err) {
    console.error(err.message);
    }
});

    app.post('/twitteroauth', async (req, res) => {
        const request_data = {
            url: 'https://api.twitter.com/oauth/request_token',
            method: 'POST',
            data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
        }
        const token = {
            key: '709221194-63OgHAt2r9lTDqhVueBZj9pdohAxr5mR6WkKjYFR',
            secret: '1IftmeyhRTvzxLxiouTieq6zEeMIfpzlyiPXrkpTAkKxe'
        }
        request(
            {
                url: request_data.url,
                method: request_data.method,
                form: oauth.authorize(request_data, token),
            },
            function(error, response, body) {
                // Process your data here
                console.log(body)
                res.send(body)
            }
        )
    });

    app.post('/twitteroauthstepthree/:oauth_token/:oauth_verifier', async (req, res) => {
        const oauthToken = req.params.oauth_token
        const oauthVerifier = req.params.oauth_verifier;
        const request_data = {
            url: `https://api.twitter.com/oauth/access_token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`,
            method: 'POST',
            data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
        }
        const token = {
            key: '709221194-63OgHAt2r9lTDqhVueBZj9pdohAxr5mR6WkKjYFR',
            secret: '1IftmeyhRTvzxLxiouTieq6zEeMIfpzlyiPXrkpTAkKxe'
        }
        request(
            {
                url: request_data.url,
                method: request_data.method,
                form: oauth.authorize(request_data, token),
            },
            function(error, response, body) {
                // Process your data here
                console.log(body)
                res.send(body)
            }
        )
    });

    app.post('/createTweet/:Tweet', async (req, res) => {
        const myTweet = req.params.Tweet
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "OAuth oauth_consumer_key=\"xIUAx8Pt2gjsfS4v9GKtBg1VC\",oauth_token=\"709221194-63OgHAt2r9lTDqhVueBZj9pdohAxr5mR6WkKjYFR\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1666471061\",oauth_nonce=\"LGT3ehrOT63\",oauth_version=\"1.0\",oauth_callback=\"http%3A%2F%2F127.0.0.1%3A3000%2F\",oauth_signature=\"1WBQQAoZxbWGBC8uCc1aFku4egs%3D\"");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "guest_id=v1%3A166524611693534220");
        
        var raw = JSON.stringify({
          "text": myTweet
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://api.twitter.com/2/tweets", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    });

}