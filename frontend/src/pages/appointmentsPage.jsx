import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL } from "../constants";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const AppointmentModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState(DAYS[0]);
  const [time, setTime] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, age, gender, type, day, time });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Appointment</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient Name"
            required
          />
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Patient Age"
            required
          />
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Select Gender"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          <Input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Appointment Type"
            required
          />
          <Select value={day} onChange={(e) => setDay(e.target.value)}>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <Button id="addAppointmentBtn" type="submit">
            Add Appointment
          </Button>
        </form>
      </div>
    </div>
  );
};

const Appointment = ({ appointment, onDragStart, onDelete }) => (
  <div
    className="appointment"
    draggable
    onDragStart={(e) => onDragStart(e, appointment)}
  >
    {`${appointment.time} - ${appointment.name} (${appointment.gender})`}
    <Button
      onClick={() => onDelete(appointment._id)}
      colorScheme="red"
      size="xs"
      marginLeft={2}
    >
      <AiOutlineDelete />
      Delete
    </Button>
  </div>
);

const Day = ({ day, appointments, onDragStart, onDrop, onDelete }) => {
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="day" onDragOver={handleDragOver} onDrop={onDrop}>
      <div className="day-header">{day}</div>
      {appointments.map((appointment, index) => (
        <Appointment
          key={index}
          appointment={appointment}
          onDragStart={onDragStart}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const WeeklyAppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedAppointment, setDraggedAppointment] = useState(null);
  const toast = useToast();

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/appoint/`);
      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAppointment = async (newAppointment) => {
    const loggedInUserEmail = localStorage.getItem("loggedinuser");
    const appointmentWithUserEmail = {
      ...newAppointment,
      email: loggedInUserEmail,
    };

    try {
      const { data } = await axios.post(
        `${BASE_URL}/appoint/create`,
        appointmentWithUserEmail
      );
      setAppointments([...appointments, data]);
      toast({
        title: `Appointment added successfully`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      toast({
        title: "Error adding appointment",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/appoint/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
      toast({
        title: "Appointment deleted.",
        description: "Appointment has been successfully deleted.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast({
        title: "Error deleting appointment",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onDragStart = (e, appointment) => {
    setDraggedAppointment(appointment);
    e.target.style.opacity = "0.5";
  };

  const onDrop = async (e, targetDay) => {
    e.preventDefault();
    if (draggedAppointment) {
      const updatedAppointment = { ...draggedAppointment, day: targetDay };

      try {
        await axios.put(
          `${BASE_URL}/appoint/${draggedAppointment._id}`,
          updatedAppointment
        );

        const updatedAppointments = appointments.map((app) =>
          app._id === draggedAppointment._id ? updatedAppointment : app
        );

        setAppointments(updatedAppointments);
        setDraggedAppointment(null);
        toast({
          title: "Appointment updated.",
          description: `Appointment moved from ${draggedAppointment.day} to ${targetDay}.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating appointment:", error);
        toast({
          title: "Error updating appointment",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <h1>Weekly Appointment Calendar</h1>
      <div className="calendar">
        {DAYS.map((day) => (
          <Day
            key={day}
            day={day}
            appointments={appointments.filter((app) => app.day === day)}
            onDrop={(e) => onDrop(e, day)}
            onDragStart={onDragStart}
            onDelete={deleteAppointment}
          />
        ))}
      </div>
      <Button
        className="add-appointment"
        style={{ float: "right", background: "green", color: "white" }}
        onClick={() => setIsModalOpen(true)}
      >
        {" "}
        <IoIosAddCircleOutline />
        Add Appointment
      </Button>
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addAppointment}
      />
      <style jsx>{`
        /* Include all the CSS styles from the original HTML here */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f0f0f0;
        }
        .calendar {
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .day {
          flex: 1;
          min-height: 300px;
          padding: 10px;
          border-right: 1px solid #e0e0e0;
        }
        .day:last-child {
          border-right: none;
        }
        .day-header {
          font-weight: bold;
          text-align: center;
          padding: 10px;
          background-color: #f9f9f9;
          border-bottom: 1px solid #e0e0e0;
        }
        .appointment {
          background-color: #e9ecef;
          padding: 8px;
          margin: 5px 0;
          border-radius: 5px;
          cursor: move;
        }
        .add-appointment {
          margin-top: 20px;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
        }
        .close {
          cursor: pointer;
          font-size: 24px;
          float: right;
        }
      `}</style>
    </div>
  );
};

export default WeeklyAppointmentCalendar;
