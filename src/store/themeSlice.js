import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
     name: 'theme',
     initialState: {
         theme: 'dark'
     },
     reducers: {
         update(state, action) {
            const newTheme = action.payload;
            return {...state, theme: newTheme};
        }
    }
})

export const { update } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;