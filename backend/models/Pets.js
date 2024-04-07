import mongoose from "mongoose";

const PetsSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avatarUrl: String,
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Pets', PetsSchema);