import {configureStore} from '@reduxjs/toolkit';
import {doctorsReducer} from './slices/doctors';
import {reviewsReducer} from './slices/reviews';
const store = configureStore({
    reducer: {
        doctors: doctorsReducer,
        reviews: reviewsReducer,
    },
})

export default store;