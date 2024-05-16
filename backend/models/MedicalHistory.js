import mongoose from "mongoose";

const MedicalHistorySchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',
        required: true,
    },
    diagnosis: {
        type: String,
        required: true,
    },
    prescriptions: {
        type: [{
            medication: {
                type: String,
                required: true,
            },
            dosage: {
                type: String,
                required: true,
            },
            frequency: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
            },
        }],
        default: null,
    },
}, 
{
    timestamps: true,
});


export default mongoose.model('MedicalHistory', MedicalHistorySchema);
