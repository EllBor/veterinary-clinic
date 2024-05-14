import mongoose from "mongoose";

const PaymentReceiptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now, 
        required: true
    },
    receiptNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    userFullName: {
        type: String,
        required: true
    },
    clinicAddress: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('PaymentReceipt', PaymentReceiptSchema);