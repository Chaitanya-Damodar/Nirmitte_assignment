import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    contactNo: { type: String, required: true },
    remainingBill: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
