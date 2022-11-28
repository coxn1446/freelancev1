import {createSlice} from "@reduxjs/toolkit";
import {useMemo} from 'react'
import {getTwitterInfo, getLinkedinInfo, getFacebookInfo1, getFacebookInfo2} from "./home.actions"

const homeSlice = createSlice({
    name: "home",
    initialState: {
        twitter: {
            profilePictureURL: '',
            textOne: '',
            textTwo: ''
        },
        linkedin: {
            profilePicutreURL: '',
            textOne: '',
            textTwo: ''
        },
        facebook: {
            profilePicutreURL: '',
            textOne: '',
            textTwo: ''
        }
    },
    reducers: {
        linkedinSignIn: () => {
            window.location.assign(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENTID}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECTURL}&state=${process.env.REACT_APP_LINKEDIN_STATE}&scope=r_liteprofile%20r_emailaddress%20w_member_social`)
        },
        facebookSignIn: () => {
            window.location.assign(`https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_CLIENTID}&redirect_uri=${process.env.REACT_APP_FACEBOOK_REDIRECTURL}&state=${process.env.REACT_APP_FACEBOOK_STATE}`)
        },
        linkedinChooseJob: (state) => {
            const jobs = ['Underwater Basket Weaver', 'Henchman', 'Ghost Hunter', 'Magician', 'Prairie Dog Wrangler', 'Butterfly Catcher', 'Water Taster', 'Cowgirl', 'Competitive Beekeeper', 'Lion Tamer', 'Disney Land Tour Guide', 'Mascot', 'Soothsayer', 'Chimney Sweep', 'Switchboard Operator', 'Town Crier' ]
            const index = Math.floor(Math.random() * jobs.length)
            state.linkedin.textTwo = jobs[index]
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getTwitterInfo.fulfilled, (state, action) => {
                state.twitter.profilePictureURL = action.payload.profile_image_url;
                state.twitter.textOne = action.payload.screen_name;
                state.twitter.textTwo = action.payload.name;

          })
        builder
        .addCase(getLinkedinInfo.fulfilled, (state, action) => {
            state.linkedin.profilePictureURL = action.payload.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
            state.linkedin.textOne = action.payload.firstName.localized.en_US + " " + action.payload.lastName.localized.en_US
        })
        builder
        .addCase(getFacebookInfo1.fulfilled, (state, action) => {
            state.facebook.textOne = action.payload.name
            state.facebook.textTwo = action.payload.id
        })
        builder
        .addCase(getFacebookInfo2.fulfilled, (state, action) => {
            state.facebook.profilePictureURL = action.payload.picture.data.url
        })
    }
})

export const selectTwitterURL = state => state.home.twitter.profilePictureURL
export const selectTwitterTextOne = state => state.home.twitter.textOne
export const selectTwitterTextTwo = state => state.home.twitter.textTwo

export const selectLinkedinURL = state => state.home.linkedin.profilePictureURL
export const selectLinkedinTextOne = state => state.home.linkedin.textOne
export const selectLinkedinTextTwo = state => state.home.linkedin.textTwo

export const selectFacebookURL = state => state.home.facebook.profilePictureURL
export const selectFacebookTextOne = state => state.home.facebook.textOne
export const selectFacebookTextTwo = state => state.home.facebook.textTwo

export const homeReducer = homeSlice.reducer;