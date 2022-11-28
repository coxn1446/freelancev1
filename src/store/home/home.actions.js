import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTwitterInfo = createAsyncThunk(
    "home/getTwitterInfo",
    async (user) => {
        let finalResult = {};
        await fetch(`http://localhost:4000/twitter/user/${user}`,{
            method: 'GET',
            credentials: "include"
        }).then(response => response.json())
        .then(result => {
            finalResult = result
        })
        return finalResult;
    }
);

export const getLinkedinInfo = createAsyncThunk(
    "home/getLinkedinInfo",
    async () => {
        let finalResult = {};
        await fetch("http://localhost:4000/linkedin/user", {
            method: 'GET',
            credentials: "include"
        }).then(response => response.json())
        .then(result => {
            finalResult = result
          })
        return finalResult;
    }
);

export const getFacebookInfo1 = createAsyncThunk(
    "home/getFacebookInfo1",
    async (token) => {
        let finalResult = {}
        await fetch( `https://graph.facebook.com/me?access_token=${token}`, {
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            finalResult = result
        })
        return finalResult
    }
);

export const getFacebookInfo2 = createAsyncThunk(
    "home/getFacebookInfo2",
    async (token) => {
        let finalResult = {}
        await fetch( `https://graph.facebook.com/v15.0/me?fields=picture&access_token=${token}`, {
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            finalResult = result
        })
        return finalResult
    }
);
