import React from 'react';
import {
  Navigate,
  useSearchParams
} from 'react-router-dom';


const Twitter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const oauthToken = searchParams.get("oauth_token")
    const oauthVerifier = searchParams.get("oauth_verifier")
    fetch(`http://localhost:4000/twitter/oauth3/${oauthToken}/${oauthVerifier}`,{
         method: 'POST'
     })

    return (
        <div>
            <Navigate to={'/'}/>
        </div>
    );
}

export default Twitter;