import express from "express";
import { register, login } from "../controller/authController.js";

const router = express.Router();

// Registration route
router.post("/register", register);

// Login route
router.post("/", login);

export default router;
