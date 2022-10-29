import {createSlice} from "@reduxjs/toolkit";
import { apiCall, twitterSignIn, twitterOAuthStep3, twitterSendTweet } from "../twitter/twitter.actions"


const twitterSlice = createSlice({
    name: "twitter",
    initialState: {
        message: "",
        twitterName: "",
        twitterSendTweetForm: "Unclicked"
    },
    reducers: {
        classChange: (state, action) => {
            const twitterClass = action.TwitterClass;
            state.twitterSendTweetForm = twitterClass

        }
    },
    extraReducers: {
        [apiCall.pending]: (state, action) => {
            state.message = 'pending';
            state.isLoading = true;
            state.hasError = false;
        },
        [apiCall.fulfilled]: (state, action) => {
            state.message = "fulfilled"
            state.isLoading = false;
            state.hasError = false;
            state.twitterName = action.payload.data.name;
        },
        [apiCall.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [twitterSignIn.pending]: (state, action) => {
            state.message = 'pending';
            state.isLoading = true;
            state.hasError = false;
        },
        [twitterSignIn.fulfilled]: (state, action) => {
            state.message = "fulfilled"
            state.isLoading = false;
            state.hasError = false;
        },
        [twitterSignIn.rejected]: (state) => {
            state.message = "rejected"
            state.isLoading = false;
            state.hasError = true;
        },  
        [twitterOAuthStep3.pending]: (state, action) => {
            state.message = 'pending';
            state.isLoading = true;
            state.hasError = false;
        },
        [twitterOAuthStep3.fulfilled]: (state, action) => {
            state.message = "fulfilled"
            state.isLoading = false;
            state.hasError = false;
        },
        [twitterOAuthStep3.rejected]: (state) => {
            state.message = "rejected"
            state.isLoading = false;
            state.hasError = true;
        },
        [twitterSendTweet.pending]: (state, action) => {
            state.message = 'tweet Sent successfully!!';
            state.isLoading = true;
            state.hasError = false;
        },
        [twitterSendTweet.fulfilled]: (state, action) => {
            state.message = "fulfilled"
            state.isLoading = false;
            state.hasError = false;
        },
        [twitterSendTweet.rejected]: (state) => {
            state.message = "rejected"
            state.isLoading = false;
            state.hasError = true;
        }              
    }
})

export const selectTwitterName = state => state.twitterName;
export const selectMessage = state => state.message;
export const selectTwitterSendTweetForm = state => state.twitterSendTweetForm;
export const twitterReducer = twitterSlice.reducer;