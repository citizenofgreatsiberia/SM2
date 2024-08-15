import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { kinoboxApi } from '../services/kinoboxAPI'
import { kinopoiskApi } from '../services/kinopoiskAPI'
import themeReducer from './themeSlice'
import categoryReducer from './categorySlice'
import selectedFilmsReducer from './selectedFilmsSlice'

const saveThemeToLocalStorage = (store) => (next) => (action) => {
    const result = next(action)
    if (action.type.startsWith('theme/')) {
        const state = store.getState()
        localStorage.setItem('theme', state.theme);
    }
    return result;
}

const saveSelectedFilmsToLocalStorage = (store) => (next) => (action) => {
    const result = next(action)
    if (action.type.startsWith('selectedFilms/')) {
        const state = store.getState()
        localStorage.setItem('selectedFilms', JSON.stringify(state.selectedFilms))
    }
    return result;
}

const store = configureStore({
    reducer: {
        theme: themeReducer,
        category: categoryReducer,
        selectedFilms: selectedFilmsReducer,
        [kinoboxApi.reducerPath]: kinoboxApi.reducer,
        [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(kinoboxApi.middleware)
        .concat(kinopoiskApi.middleware)
        .concat(saveThemeToLocalStorage)
        .concat(saveSelectedFilmsToLocalStorage),
})
export default store
setupListeners(store.dispatch)