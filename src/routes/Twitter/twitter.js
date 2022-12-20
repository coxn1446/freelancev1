import React from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

import Async from "react-async"


const Twitter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const oauthToken = searchParams.get("oauth_token")
    const oauthVerifier = searchParams.get("oauth_verifier")

    const twitterOAuth3 = async () => {
        await fetch(`http://localhost:4000/twitter/oauth3/${oauthToken}/${oauthVerifier}`,{
            method: 'POST',
            credentials: "include",
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }).then((response) => response.text())
        .then((data) => {
            return data
        })
    }

  return(
    <Async promiseFn={twitterOAuth3}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        return (
                <div>
                    <script>{window.location.assign('http://localhost:3000')}</script>
                </div>
        )
      }}
    </Async>
  )
};

export default Twitter;