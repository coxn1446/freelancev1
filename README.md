# Freelancev1
This app represents the culmination of my full-stack web development course. There isn't a whole lot happening on the surface, but looking under the hood tells a different story. This project was purely educational; I hope to use what I learned here to start building apps that do original work.

## Table Of Contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Set Up](#set-up)
* [Production](#production)

## General Info
This web app is designed to be accessible via the browser. In my build, the app was hosted by Heroku. It was written using the PERN stack (PostgreSQL, Express, React, Node).

## Technologies

#### Languages
    Javascript: ES6
    PostgreSQL: 15.1

#### Runtime Environment
    Node: v16.13.2

#### Node Packages
    bcrypt: 5.1.0
    connect-pg-simple: 8.0.0
    express: 4.18.2
    express-session: 1.17.3
    passport: 0.6.0
    passport-local: 1.0.0
    pg: 8.8.0
    react: 18.2.0
    react-async: 10.0.1
    react-dom: 18.2.0
    react-redux: 8.0.4
    react-router-dom: 6.4.2

## Set Up

To install this app locally, follow the instructions below. This assumes you already have the latest versions of Git and Node installed.

In your terminal run command

`$ git clone https://github.com/coxn1446/socialapp.git`

Install all dependencies by navigating to the newly created directory and running this command:

`$ npm install`

Next is to set your environemnt variables in a .env file in your root directory. In order for .env files to work in development state, you need to prefix all variables with "REACT_APP_". A full list of variables I used are below:

#### Heroku Variables
* REACT_APP_NODE_ENV

#### Express Variables
* REACT_APP_SESSION_SECRET

#### Database Variables
* REACT_APP_DB_user
* REACT_APP_DB_host
* REACT_APP_DB_database
* REACT_APP_DB_password
* REACT_APP_DB_port

#### Twitter Variables
* REACT_APP_TWITTER_APIKEY
* REACT_APP_TWITTER_APIKEYSECRET
* REACT_APP_TWITTER_BEARERTOKEN
* REACT_APP_TWITTER_ACESSTOKEN
* REACT_APP_TWITTER_ACCESSTOKENSECRET
* REACT_APP_TWITTER_NONCE

#### Linkedin Variables
* REACT_APP_LINKEDIN_CLIENTID
* REACT_APP_LINKEDIN_CLIENTSECRET
* REACT_APP_LINKEDIN_REDIRECTURL
* REACT_APP_LINKEDIN_STATE

#### Facebook Variables
* REACT_APP_FACEBOOK_CLIENTID
* REACT_APP_FACEBOOK_CLIENTSECRET
* REACT_APP_FACEBOOK_REDIRECTURL
* REACT_APP_FACEBOOK_STATE

In order to get variables for the three social medias, developer accounts need to be set up for each and respective apps need to be created, the instructions for which are outside the scope of this ReadMe.

Connecting to the database requires an additional download from https://www.postgresql.org/ I used a Mac during the build and was able to use Postgres.app which was a light-weight version of the full client.

To get the Express server to work in development, ensure the proxy is set in package.json to "http://localhost:80" This is because React runs on Port 3000 by default and you need a separate proxy server in development.

After all the above has been sorted, you can start the app by running the following commands while in the root directory:

```
$ npm start
$ npm run server
```
The app should now be viewable in your browser at "http://localhost:3000"

## Production
If you decide to clone this repo and make a website of your own, you will need to do a few things in order to get the app ready for development.

1. You will need a domain name
    * I used Namecheap to buy my domain: freelancev1.com
    * You will then need to replace my domain in my source code with your domain. A simple find and replace function in your code editor ought to do the trick
2. You will need to host your code somewhere, I used Heroku which has a handy PostgreSQL plug in.
3. Remove the proxy line from package.json. A proxy server will ruin your Express middleware in production.
4. When you are done editing the source code, you need to run the following command:
    * `$ npm run build`
    * This will reduce your source code to a single, optimized script that will be readable by your single-HTML-page React app.
