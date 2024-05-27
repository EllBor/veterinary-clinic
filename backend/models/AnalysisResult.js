import mongoose from "mongoose";

const AnalysisResultSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
      required: true,
    },
    analysisName: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AnalysisResult", AnalysisResultSchema);
