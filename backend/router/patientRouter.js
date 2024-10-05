import {
  getAllPatient,
  getSinglePatient,
  postSinglePatient,
  deletePatient,
} from "../controller/patientAppointment.js";
import express from "express";

const router = express.Router();

router.route("/").get(getAllPatient);
router
  .route("/:id")
  .get(getSinglePatient)
  .post(postSinglePatient)
  .delete(deletePatient);

export default router;
