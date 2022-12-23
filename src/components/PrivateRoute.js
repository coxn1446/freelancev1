import React from 'react';
import {
    Outlet,
    Navigate 
  } from 'react-router-dom';
import Async from "react-async"
let cookieData
let userData

// Your promiseFn receives all props from Async and an AbortController instance
const loadCookie = async () => {
  let passport
  await fetch(`/auth/login`, {
    method: 'GET',
    credentials: 'include'
  }).then((response) => response.json())
  .then(async (data) => {
    passport = Object.keys(data)[1]
    await fetch(`/auth/login`, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => response.json())
    .then(async (data) => {
      cookieData = data
      await fetch(`/users/${data.passport.user.id}`, {
        method: 'GET',
        credentials: 'include'
      }).then((response) => response.json())
      .then((data1) => {
        userData = data1
      })
    })
  })
  return passport
}

const PrivateRoutes = () => {
  return(
    <Async promiseFn={loadCookie}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return (<Navigate to={'/login'}/>)
        if (data === "passport") {
          return (<Outlet context={[cookieData, userData]}></Outlet>)
        }
          return(<Navigate to={'/login'}/>)
      }}
    </Async>
  )
};

export default PrivateRoutes;