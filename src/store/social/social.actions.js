import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTwitterInfo = createAsyncThunk(
    "social/getTwitterInfo",
    async (user) => {
        let finalResult = {};
        await fetch(`/twitter/user/${user}`,{
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
    "social/getLinkedinInfo",
    async () => {
        let finalResult = {};
        await fetch("/linkedin/user", {
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
    "social/getFacebookInfo1",
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
    "social/getFacebookInfo2",
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
