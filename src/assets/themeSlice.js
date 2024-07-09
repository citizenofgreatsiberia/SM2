import { createSlice } from "@reduxjs/toolkit"

export const themeSlice = createSlice({
    name: 'theme',
    initialState: 'dark',
    reducers: {
        changeTheme: state => {
            switch (state) {
                case 'dark':
                    return 'light'
                case 'light':
                    return 'dark'
                default:
                    return state
            }
        }
    }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer