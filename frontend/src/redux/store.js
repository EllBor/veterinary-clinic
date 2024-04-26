import {configureStore} from '@reduxjs/toolkit';
import {doctorsReducer} from './slices/doctors';
import {reviewsReducer} from './slices/reviews';
import { petsReducer } from './slices/pets';
import { authReducer } from './slices/auth';
import { usersReducer } from './slices/users';
import { appointmentReducer } from './slices/appointment';
import { servicesReducer } from './slices/services';

const store = configureStore({
    reducer: {
        doctors: doctorsReducer,
        reviews: reviewsReducer,
        pets: petsReducer,
        auth: authReducer,
        users: usersReducer,
        appointment: appointmentReducer,
        services: servicesReducer,
    },
})

export default store;