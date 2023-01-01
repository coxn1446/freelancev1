import React from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

import Async from "react-async"


const Twitter = () => {
    //pulls in UTM parameters to run the next OAuth step
    const [searchParams] = useSearchParams();
    const oauthToken = searchParams.get("oauth_token")
    const oauthVerifier = searchParams.get("oauth_verifier")

    //automatically runs the next OAuth step and then redirects to the home page
    const twitterOAuth3 = async () => {
        await fetch(`/twitter/oauth3/${oauthToken}/${oauthVerifier}`,{
            method: 'POST',
            credentials: "include",
            headers: {'Access-Control-Allow-Origin': ['http://localhost:3000', 'https://www.freelancev1.com']}
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
        if(process.env.REACT_APP_NODE_ENV === "development"){
          return (
            <div>
                <script>{window.location.assign('http://localhost:3000')}</script>
            </div>
          )
        }
        if(process.env.REACT_APP_NODE_ENV === "production"){
          return (
            <div>
                <script>{window.location.assign('https://www.freelancev1.com')}</script>
            </div>
          )
        }
      }}
    </Async>
  )
};

export default Twitter;