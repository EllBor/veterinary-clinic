import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    },
    appointment_date_time: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['запланирован', 'завершен', 'отменен'],
        default: 'запланирован'
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Appointments', AppointmentSchema);