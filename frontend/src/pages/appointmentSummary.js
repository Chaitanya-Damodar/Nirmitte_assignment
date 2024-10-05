import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentSummary = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get("/api/appointments");
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.title} - {new Date(appt.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentSummary;
