import {createSlice} from '@reduxjs/toolkit'

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        movies: []
    },
    reducers: {
        ADD_A_FAV_MOVIE: (state, action) => {
            state.movies = [...state.movies, action.payload]
        },
        DELETE_A_FAV_MOVIE: (state, action) => {
            state.movies = state.movies.filter(element => element !== action.payload)
        }
    }
})

export const {ADD_A_FAV_MOVIE, DELETE_A_FAV_MOVIE} = favoritesSlice.actions

export default favoritesSlice.reducer