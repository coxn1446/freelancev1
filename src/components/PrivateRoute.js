import React from 'react';
import {
    Outlet,
    Navigate 
  } from 'react-router-dom';
import Async from "react-async"


// Your promiseFn receives all props from Async and an AbortController instance
const loadCookie = async () => {
  let number = 0
  await fetch(`http://localhost:4000/auth/login`, {
    method: 'GET',
    credentials: 'include'
  }).then((response) => response.json())
  .then((data) => {
    const length = Object.keys(data).length;
    number = length
  })
  return number
}

const PrivateRoutes = (data) => {
  return(
    <Async promiseFn={loadCookie}>
      {({ data, error, isPending }) => {
        if (isPending) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        if (data === 2) {
          return (<Outlet></Outlet>)
        }
          return(<Navigate to={'/login'}/>)
      }}
    </Async>
  )
};

export default PrivateRoutes;