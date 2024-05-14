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
        ref: 'Users',
        required: true,
    },
    avatarUrl: String,
    analysisResults: {
        type: [{
            analysisName: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
            }
        }],
        default: null 
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Pets', PetsSchema);