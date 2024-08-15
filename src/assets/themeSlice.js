import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem('theme') || 'light'

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            return state === 'light' ? 'dark' : 'light';
        },
    },
});


export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer