import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    
    review_text: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    publication_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    response: String,
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Reviews', ReviewsSchema);