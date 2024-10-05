import { getAllDoctor,getSingleDoctor,postSingleDoctor,deleteDoctor } from "../controller/doctorAppointment.js";
import express from 'express'

const router=express.Router();

router.route('/').get(getAllDoctor);
router.route('/:id').get(getSingleDoctor).post(postSingleDoctor).delete(deleteDoctor);

export default router;