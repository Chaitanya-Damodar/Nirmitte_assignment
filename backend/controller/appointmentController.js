import Appointment from "../model/appointmentSchema.model.js";
import userSchemaModel from "../model/userSchema.model.js";

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error });
  }
};

export const getSingleAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const singleAppointment = await Appointment.findById({ _id: id });
    if (!singleAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(singleAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointment", error });
  }
};

// Post a new appointment
export const postSingleAppointment = async (req, res) => {
  const { email, name, age, gender, day, time } = req.body;
  console.log({ name });

  try {
    // Check if the appointment already exists
    const appointmentExist = await Appointment.findOne({ name, day, time });

    const userData = await userSchemaModel.findOne({ email: email });

    console.log({ userData });

    if (appointmentExist) {
      return res.status(400).json({ message: "Appointment already exists" });
    }

    const appointment = await Appointment.create({
      name,
      age,
      gender,
      day,
      time,
    });

    await userData.updateOne({
      appointments: appointment?._id,
    });

    res.status(201).json({
      _id: appointment._id,
      name: appointment.name,
      age: appointment.age,
      gender: appointment.gender,
      day: appointment.day,
      time: appointment.time,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid appointment data", error });
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await appointment.deleteOne();
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

// Update an appointment by ID
export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { day, time } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.day = day || appointment.day;
    appointment.time = time || appointment.time;

    await appointment.save();

    res.status(200).json({
      _id: appointment._id,
      day: appointment.day,
      time: appointment.time,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};
