import express from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  postSingleAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controller/appointmentController.js";

import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Public Route: Get all appointments
router.route("/").get(getAllAppointments);

// Protected Route: Create a new appointment (requires authentication)
router.route("/create").post(postSingleAppointment);

// Protected Route: Update an appointment (requires authentication)
router.route("/:id").put(updateAppointment);

// Protected Route: Get a single appointment by ID (requires authentication)
router.route("/:id").get(protect, getSingleAppointment);

// Protected Route: Delete an appointment by ID (requires authentication)
router.route("/:id").delete(deleteAppointment);

export default router;
