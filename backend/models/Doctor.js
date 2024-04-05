import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    appointment_dates: [
        {
            start_date_time: {
                type: Date,
                required: true
            },
            end_date_time: {
                type: Date,
                required: true
            }
        }
    ],
    avatarUrl: String,
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Doctors', DoctorSchema);