import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    speciality: { type: String, required: true },
    address: { type: String, required: true },
    contactNo: { type: String, required: true },
    fees: { type: Number, required: true, default: 500 },
  },
  { timestamps: true }
);
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
