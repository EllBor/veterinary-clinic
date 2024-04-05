import mongoose from "mongoose";

const PaymentsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    payment_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Payments', PaymentsSchema);