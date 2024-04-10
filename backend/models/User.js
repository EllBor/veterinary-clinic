import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    aboutUser: String,
    avatarUrl: String,
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Users', UserSchema);