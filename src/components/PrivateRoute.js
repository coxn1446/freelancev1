import React from 'react';
import {
    Outlet,
    Navigate 
  } from 'react-router-dom';
import Async from "react-async"


// Your promiseFn receives all props from Async and an AbortController instance
const loadCookie = async () => {
  let passport
  await fetch(`http://localhost:4000/auth/login`, {
    method: 'GET',
    credentials: 'include'
  }).then((response) => response.json())
  .then((data) => {
    passport = Object.keys(data)[1]
  })
  return passport
}

let username

fetch(`http://localhost:4000/auth/login`, {
  method: 'GET',
  credentials: 'include'
}).then((response) => response.json())
.then((data) => {
  username = data.passport.user.username
})

const PrivateRoutes = () => {
  return(
    <Async promiseFn={loadCookie}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        if (data === "passport") {
          return (<Outlet context={[username]}></Outlet>)
        }
          return(<Navigate to={'/login'}/>)
      }}
    </Async>
  )
};

export default PrivateRoutes;