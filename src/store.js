import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './reducers/myMovies/counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer
    }
})  