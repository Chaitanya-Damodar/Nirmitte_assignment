import mongoose from "mongoose";
import doctor from "./model/doctorSchema.js";
import patient from "./model/patientSchema.js";
import dotenv from "dotenv";
import Doctor from "./Data/DoctorData.js";
import Patient from "./Data/PatientData.js";
import connectDB from "./database/db.js";
import colors from 'colors';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await doctor.deleteMany();
    await patient.deleteMany();

    const createDoctor = await doctor.insertMany(Doctor);
    const createPatient = await patient.insertMany(Patient);

    console.log(colors.green.inverse("Data Imported"));
    process.exit();
  } catch (error) {
    console.log(colors.red.inverse("Error in Data Import"));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await doctor.deleteMany();
    await patient.deleteMany();

    console.log(colors.yellow.inverse("Data Destroyed"));
    process.exit();
  } catch (error) {
    console.log(colors.orange.inverse("Data not Destroyed"));
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
