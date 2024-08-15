import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem('selectedFilms')) || []

export const selectedFilmsSlice = createSlice({
    name: 'selectedFilms',
    initialState,
    reducers: {
        addFilm: (state, action) => {
            const film = action.payload
            state.push(film)
        },
        removeFilm: (state, action) => {
            return state.filter(film => film.filmId != action.payload)
        },
    },
});

export const { addFilm, removeFilm } = selectedFilmsSlice.actions;
export default selectedFilmsSlice.reducer;