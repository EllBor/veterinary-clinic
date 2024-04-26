import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    pet: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',
        required: true
    },
    appointment_date_time: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['запланирован', 'завершен', 'отменен', 'активен'],
        default: 'запланирован'
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Appointments', AppointmentSchema);