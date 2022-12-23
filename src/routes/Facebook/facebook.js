import React from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

import Async from "react-async"


const Facebook = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")

    const facebookOAuth2 = async () => {
        await fetch(`/facebook/oauth2/${code}`,{
            method: 'GET',
            credentials: "include",
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
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
                    <script>{window.location.assign('http://localhost:3000')}</script>
                </div>
        )
      }}
    </Async>
  )
};

export default Facebook;