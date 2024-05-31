import mongoose from "mongoose";
import AnalysisResultModel from "./AnalysisResult.js"; 
import MedicalHistoryModel from "./MedicalHistory.js";
import AppointmentsModel from "./Appointments.js";

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
    avatarUrl: String
}, 
    {
        timestamps: true,
    },
);

PetsSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
      await AnalysisResultModel.deleteMany({ pet: this._id });
      await MedicalHistoryModel.deleteMany({ pet: this._id });
      await AppointmentsModel.deleteMany({ pet: this._id });
      next();
    } catch (error) {
      next(error);
    }
  });

export default mongoose.model('Pets', PetsSchema);