import mongoose from "mongoose";

const DoctorServiceSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services'
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('DoctorService', DoctorServiceSchema);