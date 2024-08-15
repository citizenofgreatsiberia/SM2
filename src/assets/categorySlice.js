import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: 'category',
    initialState: 'film',
    reducers: {
        changeCategory: category => {
            switch (category) {
                case 'film':
                    return 'series'
                case 'series':
                    return 'film'
                default:
                    return state
            }
        }
    }
})

export const { changeCategory } = categorySlice.actions
export default categorySlice.reducer