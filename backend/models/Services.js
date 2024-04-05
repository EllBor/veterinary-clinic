import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema({
    
    service_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Services', ServicesSchema);