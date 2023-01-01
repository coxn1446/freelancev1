import {createSlice} from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name: "blog",
    initialState: {
        post: "None",
    },
    reducers: {
        //sets state to the selected blog
        selectPost: (state, action) => {
            const post = action.target;
            state.post = post
        }
    }
})

export const selectPost = state => state.blog.post;
export const blogReducer = blogSlice.reducer;