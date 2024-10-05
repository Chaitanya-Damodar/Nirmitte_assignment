import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import appointmentRouter from "./router/appointmentRouter.js";
import doctorRouter from "./router/doctorRouter.js";
import patientRouter from "./router/patientRouter.js";
import cookieParser from "cookie-parser";
import authRoutes from "./router/authRoutes.js";

dotenv.config();
connectDB();
const app = express();
import cors from "cors";

app.use(cors());

const PORT = 5200;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running of calendar");
});

console.log({ PORT });

app.use("/login", authRoutes);
app.use("/appoint", appointmentRouter);
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
