import mongoose from "mongoose";
import PaymentReceiptModel from "./PaymentReceipt.js";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    secretAnswer: {
        type: String,
        required: true
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

UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
      await PaymentReceiptModel.deleteMany({ user: this._id });
      next();
    } catch (error) {
      next(error);
    }
  });
  
export default mongoose.model('Users', UserSchema);