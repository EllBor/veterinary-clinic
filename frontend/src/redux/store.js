import {configureStore} from '@reduxjs/toolkit';
import {doctorsReducer} from './slices/doctors';
import {reviewsReducer} from './slices/reviews';
import { petsReducer } from './slices/pets';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        doctors: doctorsReducer,
        reviews: reviewsReducer,
        pets: petsReducer,
        auth: authReducer,
    },
})

export default store;