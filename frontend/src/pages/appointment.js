import React, { useState } from "react";
import axios from "axios";

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/appointments", formData);
    setFormData({ title: "", date: new Date() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Appointment Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <button type="submit">Add Appointment</button>
    </form>
  );
};

export default AddAppointment;
