import {createAsyncThunk} from "@reduxjs/toolkit";

export const apiCall = createAsyncThunk(
    "twitter/apiCall",
    async (term) => {
        const response = await fetch(`http://localhost:5000/express_backend/${term}`)
        const data = await response.json()
        return data;
    }
  );
  
  export const twitterSignIn = createAsyncThunk(
    "twitter/twitterSignIn",
        async () => {
           const response = await fetch(`http://127.0.0.1:5000/twitteroauth`,{
            method: 'POST'
        })
        const data = await response.text()
        window.location.replace(`https://api.twitter.com/oauth/authorize?${data}`)
    },
);

export const twitterOAuthStep3 = createAsyncThunk(
    "twitter/twitterOAuthStep3",
    async () => {
        let params = new URLSearchParams(document.location.search);
        const oauthToken = params.get("oauth_token")
        const oauthVerifier = params.get("oauth_verifier")
        const response = await fetch(`http://127.0.0.1:5000/twitteroauthstepthree/${oauthToken}/${oauthVerifier}`,{
         method: 'POST'
     })
    },
);

export const twitterSendTweet = createAsyncThunk(
    "twitter/twitterSendTweet",
        async (tweet) => {
            const response = await fetch(`http://localhost:5000/createTweet/${tweet}`,{
                method: 'POST'
            })
    },
);