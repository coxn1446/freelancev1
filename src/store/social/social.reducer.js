import {createSlice} from "@reduxjs/toolkit";
import {getTwitterInfo, getLinkedinInfo, getFacebookInfo1, getFacebookInfo2} from "./social.actions"

const socialSlice = createSlice({
    name: "social",
    initialState: {
        itemBStyle: {border: '3px solid black'},
        itemCStyle: {border: '3px solid black'},
        itemDStyle: {border: '3px solid black'},
        isFacebookSelected: false,
        formAction: "",
        formSubmitText: "Select A Profile",
        textareaPlaceholderText: "Sign in to one of your profiles to start publishing content. What you get: a post on your timeline. What I get: the nominal value received from selling your personal data on the dark web.",
        twitter: {
            profilePictureURL: null,
            textOne: null,
            textTwo: null,
        },
        linkedin: {
            profilePicutreURL: null,
            textOne: null,
            textTwo: null,
            id: ""
        },
        facebook: {
            profilePicutreURL: null,
            textOne: null,
            textTwo: null
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
        },
        selectProfile: (state, action) => {
            const expr = action.target
            switch (expr) {
            case 'itemBContainerSocial':
                state.itemBStyle = {border: '3px solid lime'};
                state.itemCStyle = {border: '3px solid black'};
                state.itemDStyle = {border: '3px solid black'};
                state.formSubmitText = "Provide Unsolicited Opinion on Twitter";
                state.formAction = "http://localhost:4000/twitter/sendtweet"
                state.isFacebookSelected = false;
                state.textareaPlaceholderText = "Twitter is sensitive to a type of attack called 'CORS' or Cross-Origin Resource Sharing. Essentially, Twitter checks to make sure the server that receives the resource from their database is the same server that made the request. You typically want CORS disabled within your app to prevent foreign scripts from running. Since Twitter has disabled CORS on it's API, you are not allowed to send this tweet directly from the browser, it must go through an auxilary server I have created in the back-end.";
                break;
            case 'itemCContainerSocial':
                state.itemBStyle = {border: '3px solid black'};
                state.itemCStyle = {border: '3px solid lime'};
                state.itemDStyle = {border: '3px solid black'};
                state.formAction = ""
                state.isFacebookSelected = true;
                state.textareaPlaceholderText = "In the wake of the 2018 Cambridge Analytics scandal, Facebook no longer allows 3rd-party apps to publish posts to User timelines. Clicking the button below brings you to Facebook's own first-party publishing tool. I can't even prepopulate their publishing tool with text from my app; Facebook doesn't want 3rd-party apps controlling dialogue on their platform anymore."
                break;
            case 'itemDContainerSocial':
                state.itemBStyle = {border: '3px solid black'};
                state.itemCStyle = {border: '3px solid black'};
                state.itemDStyle = {border: '3px solid lime'};
                state.formAction = "http://localhost:4000/linkedin/share"
                state.formSubmitText = "Share Thought Leadership on LinkedIn"
                state.isFacebookSelected = false;
                state.textareaPlaceholderText = `You need to apply for additional permissions through the LinkedIn developer portal in order to pull Job Titles. I have just made up your job as a placeholder, you are a ${state.linkedin.textTwo} now.`
                break;
            }
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
            state.linkedin.id = action.payload.id
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

export const selectFormSubmitText = state => state.social.formSubmitText;
export const selectItemBStyle = state => state.social.itemBStyle;
export const selectItemCStyle = state => state.social.itemCStyle;
export const selectItemDStyle = state => state.social.itemDStyle;
export const selectTextareaPlaceholderText = state => state.social.textareaPlaceholderText;
export const selectIsFacebookSelected = state => state.social.isFacebookSelected;
export const selectFormAction = state => state.social.formAction;

export const selectTwitterURL = state => state.social.twitter.profilePictureURL;
export const selectTwitterTextOne = state => state.social.twitter.textOne;
export const selectTwitterTextTwo = state => state.social.twitter.textTwo;

export const selectLinkedinURL = state => state.social.linkedin.profilePictureURL;
export const selectLinkedinTextOne = state => state.social.linkedin.textOne;
export const selectLinkedinTextTwo = state => state.social.linkedin.textTwo;
export const selectLinkedinID = state => state.social.linkedin.id;


export const selectFacebookURL = state => state.social.facebook.profilePictureURL;
export const selectFacebookTextOne = state => state.social.facebook.textOne;
export const selectFacebookTextTwo = state => state.social.facebook.textTwo;

export const socialReducer = socialSlice.reducer;