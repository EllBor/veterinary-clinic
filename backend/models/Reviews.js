import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    
    review_text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    publication_date: {
        type: Date,
        required: true,
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
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Reviews', ReviewsSchema);