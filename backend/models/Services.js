import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema({
    service_name: {
        type: String,
        required: true,
    },
    diagnostics: [
        {
          diagnostics_name: {
            type: String,
            required: true,
          },
          diagnostics_price: {
            type: Number,
            required: true,
          },
        },
    ],
    number: {
        type: Number,
        required: true
    },
    avatarUrl: String,
}, 
    {
        timestamps: true,
    },
);

export default mongoose.model('Services', ServicesSchema);