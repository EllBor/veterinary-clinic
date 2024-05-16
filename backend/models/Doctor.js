import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    level_education: {
      type: String,
      required: true,
    },
    courses: [
      {
        course_name: {
          type: String,
          required: true,
        },
        completion_date: {
          type: Date,
          required: true,
        },
      },
    ],
    appointment_dates: [
      {
        service_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Services",
          required: true,
        },
        start_date_time: {
          type: Date,
          required: true,
        },
        end_date_time: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ['запланирован', 'активен'],
          default: 'активен'
      },
      },
    ],
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctors", DoctorSchema);
