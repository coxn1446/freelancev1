import {createSlice} from "@reduxjs/toolkit";



const registerSlice = createSlice({
    name: "register",
    initialState: {
        displayType1: 'none',
        displayType2: 'none',
        displayType3: 'none'
    },
    reducers: {
        classChange: (state, action) => {
            const expr = action.target
            switch (expr) {
            case 'radioChoice1a':
                state.displayType1 = 'block'
                break;
            case 'radioChoice1b':
                state.displayType1 = 'none'
                state.displayType2 = 'none'
                state.displayType3 = 'none'
                break;
            case 'radioChoice2a':
                state.displayType2 = 'block'
                break;
            case 'radioChoice2b':
                state.displayType2 = 'none'
                state.displayType3 = 'none'
                break;
            case 'radioChoice3a':
                state.displayType3 = 'block'
                break;
            case 'radioChoice3b':
                state.displayType3 = 'none'
                break;
            }
        }
    }
})

export const selectDisplayType1 = state => state.register.displayType1;
export const selectDisplayType2 = state => state.register.displayType2;
export const selectDisplayType3 = state => state.register.displayType3;

export const registerReducer = registerSlice.reducer;