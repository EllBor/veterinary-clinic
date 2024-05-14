import {configureStore} from '@reduxjs/toolkit';
import {doctorsReducer} from './slices/doctors';
import {reviewsReducer} from './slices/reviews';
import { petsReducer } from './slices/pets';
import { authReducer } from './slices/auth';
import { usersReducer } from './slices/users';
import { appointmentReducer } from './slices/appointment';
import { servicesReducer } from './slices/services';
import { receiptReducer } from './slices/receipt';
import { historiesReducer } from './slices/histories';

const store = configureStore({
    reducer: {
        doctors: doctorsReducer,
        reviews: reviewsReducer,
        pets: petsReducer,
        auth: authReducer,
        users: usersReducer,
        appointment: appointmentReducer,
        services: servicesReducer,
        receipt: receiptReducer,
        histories: historiesReducer,
    },
})

export default store;