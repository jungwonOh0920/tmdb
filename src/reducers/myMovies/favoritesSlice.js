import {createSlice} from '@reduxjs/toolkit'

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        movies: []
    },
    reducers: {
        INITIALIZE: (state, action) => {
            state.movies = action.payload
        },
        ADD_A_FAV_MOVIE: (state, action) => {
            let alreadySelected = false

            state.movies.map((movie) => {
                if (movie === action.payload) {
                    alreadySelected = true
                    return
                }
            })
            if (!alreadySelected) {
                state.movies = [...state.movies, action.payload]
            }
        },
        DELETE_A_FAV_MOVIE: (state, action) => {
            state.movies = state.movies.filter(element => element !== action.payload)
        }
    }
})

export const {ADD_A_FAV_MOVIE, DELETE_A_FAV_MOVIE, INITIALIZE} = favoritesSlice.actions

export default favoritesSlice.reducer