import {createSlice} from "@reduxjs/toolkit";
import {getTwitterInfo, getLinkedinInfo, getFacebookInfo1, getFacebookInfo2} from "./social.actions"

const socialSlice = createSlice({
    name: "social",
    initialState: {
        horoscope: "",
        itemBStyle: {border: '3px solid black'},
        itemCStyle: {border: '3px solid black'},
        itemDStyle: {border: '3px solid black'},
        isFacebookSelected: false,
        maxLength: "3000",
        formAction: "",
        formSubmitText: "Select A Profile",
        textareaPlaceholderText: "Sign in to one of your profiles to start publishing content. What you get: a post on your timeline. What I get: the nominal value received from selling your personal data on the dark web.",
        twitter: {
            profilePictureURL: "",
            textOne: null,
            textTwo: null,
        },
        linkedin: {
            textOne: null,
            textTwo: null,
            id: ""
        },
        facebook: {
            profilePicutreURL: "",
            textOne: null,
            textTwo: null
        }
    },
    reducers: {
        //function executes when user clicks linkedin's sign in button
        linkedinSignIn: () => {
            window.location.assign(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENTID}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECTURL}&state=${process.env.REACT_APP_LINKEDIN_STATE}&scope=r_liteprofile%20r_emailaddress%20w_member_social`)
        },
        //function executes when user clicks facebook's sign in button
        facebookSignIn: () => {
            window.location.assign(`https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_CLIENTID}&redirect_uri=${process.env.REACT_APP_FACEBOOK_REDIRECTURL}&state=${process.env.REACT_APP_FACEBOOK_STATE}`)
        },
        //creates a placeholder job to display when someone signs into LinkedIn
        linkedinChooseJob: (state) => {
            const jobs = ['Underwater Basket Weaver', 'Henchman', 'Ghost Hunter', 'Magician', 'Prairie Dog Wrangler', 'Butterfly Catcher', 'Water Taster', 'Cowgirl', 'Competitive Beekeeper', 'Lion Tamer', 'Disney Land Tour Guide', 'Mascot', 'Soothsayer', 'Chimney Sweep', 'Switchboard Operator', 'Town Crier' ]
            const index = Math.floor(Math.random() * jobs.length)
            state.linkedin.textTwo = jobs[index]
        },
        //changes a bunch of state variables depending on what profile is selected
        selectProfile: (state, action) => {
            const expr = action.target
            switch (expr) {
            case 'itemDContainerSocial':
                state.itemBStyle = {border: '3px solid lime'};
                state.itemCStyle = {border: '3px solid black'};
                state.itemDStyle = {border: '3px solid black'};
                state.formSubmitText = "Provide Unsolicited Opinion on Twitter";
                state.formAction = "/twitter/sendtweet"
                state.isFacebookSelected = false;
                state.maxLength = "280"
                state.textareaPlaceholderText = "Twitter is sensitive to a type of attack called 'CORS' or Cross-Origin Resource Sharing. To make successful calls to Twitter's API, you must create your own server and send the request from there.";
                break;
            case 'itemEContainerSocial':
                state.itemBStyle = {border: '3px solid black'};
                state.itemCStyle = {border: '3px solid lime'};
                state.itemDStyle = {border: '3px solid black'};
                state.formAction = ""
                state.maxLength = "3000"
                state.isFacebookSelected = true;
                state.textareaPlaceholderText = "In the wake of the 2018 Cambridge Analytics scandal, Facebook no longer allows 3rd-party apps to publish posts to User timelines. Facebook doesn't want 3rd-party apps controlling dialogue on their platform anymore."
                break;
            case 'itemFContainerSocial':
                state.itemBStyle = {border: '3px solid black'};
                state.itemCStyle = {border: '3px solid black'};
                state.itemDStyle = {border: '3px solid lime'};
                state.formAction = "/linkedin/share"
                state.formSubmitText = "Share Thought Leadership on LinkedIn"
                state.isFacebookSelected = false;
                state.maxLength = "3000"
                state.textareaPlaceholderText = `You need to apply for additional permissions through the LinkedIn developer portal in order to pull Job Titles. I have just made up your job as a placeholder, you are a ${state.linkedin.textTwo} now.`
                break;
            default:
                state.itemBStyle = {border: '3px solid black'};
                state.itemCStyle = {border: '3px solid black'};
                state.itemDStyle = {border: '3px solid black'};
                state.formAction = "";
                state.isFacebookSelected = false;
                state.maxLength = "3000";
                state.formSubmitText = "Select A Profile";
                state.textareaPlaceholderText = "Sign in to one of your profiles to start publishing content. What you get: a post on your timeline. What I get: the nominal value received from selling your personal data on the dark web.";
            }
        },
        //chooses a random horoscope message to display on the homepage
        chooseHoroscope: (state) => {
            const horoscopes = [
                "Be mindful today. Or don't be, I'm not your boss.",
                "Focus on action. Not quite sure what else you CAN focus on tbh.",
                "You know what you're running from. It's me. Run faster.",
                "Don't be afraid to let your crack(s) show.",
                "What is the difference between your public and private self? What about your public and private parts ?",
                "Talk things out. Start with yourself. Speak with your reflection for at least an hour today.",
                "Don't escape into abstract intellectualism today. Do something dumb, go watch a monster truck rally.",
                "Be weary of grand pianos.",
                "Watch out for carpenters.",
                "Your Pluto in Scorpio is the source of your unrelenting misery. Nothing is your fault. Eliminate the desire for self-improvement.",
                "Bury a time capsule in your neighbor's backyard. Tell no one.",
                "Briefly suspend your belief in oranges. Marvel at your brain's ability to eliminate the existence of certain fruit.",
                "Take pride in your ambition. Any form of criticism is just thinly veiled jealousy.",
                "Do something creative today! Build a mental prison for you to live in 24/7!",
                "Curse out a co-worker for no reason. Mention how much more you make than them even if it's not true.",
                "Draw a Venn Diagram. Put what you find sexy on one side and what you find terrifying on the other. In the middle put the clown from It.",
                "Get some new lotion. You're getting flaky.",
                "Don't show up to work this week. They don't deserve you.",
                "Your body is more aware than you think. You need to tune that out, try Jack Daniels.",
                "Your emotions are on the verge of spilling out. Bottle that up, do not seek help; you don't need anything other than a firm belief in yourself.",
                "Listen to the voices in your head for once.",
                "Duel someone in the village square over your honor. If your honor hasn't been infringed upon, fight for someone else's.",
                "Pick a new skill to learn. Make a life-altering decision today with little thought."
            ]
            const index = Math.floor((Math.random() * horoscopes.length))
            state.horoscope = horoscopes[index]
        },
        //Social route reads UTM parameter which triggers a dispatch which changes these state variables
        changeTextAreaText: (state, action) => {
            const expr = action.target
            switch (expr) {
            case 'tweetsent':
                state.textareaPlaceholderText = 'Tweet sent successfully. Send another?'
                break;
            case 'linkedinPostSent':
                state.textareaPlaceholderText = 'Thought leadership disseminated. Send some more?'
                break;
            case 'facebookPostSent':
                state.textareaPlaceholderText = 'Misinformation spread successfully. Send some more?'
                break;
            default:
                state.textareaPlaceholderText = "Sign in to one of your profiles to start publishing content. What you get: a post on your timeline. What I get: the nominal value received from selling your personal data on the dark web.";
            }
        }
    },
    //extra Reducers are used to resolve thunk promises
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

//exports all state variables

export const selectHoroscope = state => state.social.horoscope;

export const selectFormSubmitText = state => state.social.formSubmitText;
export const selectItemBStyle = state => state.social.itemBStyle;
export const selectItemCStyle = state => state.social.itemCStyle;
export const selectItemDStyle = state => state.social.itemDStyle;
export const selectTextareaPlaceholderText = state => state.social.textareaPlaceholderText;
export const selectIsFacebookSelected = state => state.social.isFacebookSelected;
export const selectFormAction = state => state.social.formAction;
export const selectMaxLength = state => state.social.maxLength;

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