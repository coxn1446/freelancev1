import React from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

import Async from "react-async"


const Facebook = () => {
    //pulls in UTM parameters to run the next OAuth step
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")

    //automatically runs the next OAuth step and then redirects to the home page
    const facebookOAuth2 = async () => {
        await fetch(`/facebook/oauth2/${code}`,{
            method: 'GET',
            credentials: "include",
            headers: {'Access-Control-Allow-Origin': ['http://localhost:3000', 'https://www.freelancev1.com']}
        }).then((response) => response.text())
        .then((data) => {
            return data
        })
    }

  return(
    <Async promiseFn={facebookOAuth2}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        return (
                <div>
                    <script>{window.location.assign('https://www.freelancev1.com')}</script>
                </div>
        )
      }}
    </Async>
  )
};

export default Facebook;