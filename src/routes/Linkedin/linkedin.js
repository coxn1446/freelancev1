import React from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

import Async from "react-async"


const LinkedIn = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")

    const linkedinOAuth3 = async () => {
        await fetch(`/linkedin/oauth3/${code}`,{
            method: 'POST',
            credentials: "include",
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }).then((response) => response.text())
        .then((data) => {
            return data
        })
    }

  return(
    <Async promiseFn={linkedinOAuth3}>
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

export default LinkedIn;