import React from "react";
import WeeklyAppointmentCalendar from "./pages/appointmentsPage";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Summary from "./pages/summerypage";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/appointment"
        element={<WeeklyAppointmentCalendar />}
      ></Route>
      <Route path="/summary" element={<Summary />}></Route>
      <Route path="/register" element={<Register />}>
        {" "}
      </Route>
    </Routes>
  );
}

export default App;
