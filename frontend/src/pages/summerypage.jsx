import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";

const Summary = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointment = async () => {
    try {
      const { data } = await axios.get("http://localhost:5200/appoint/");
      setAppointments(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAppointment();
  }, []);
  return (
    <Box
      w={{ base: "90%", md: "80%" }}
      mx="auto"
      mt={10}
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.100"
    >
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Appointment Summary
      </Heading>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Age</Th>
              <Th>Day</Th>
              <Th>Time</Th>
              <Th>Gender</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment) => (
              <Tr key={appointment.id}>
                <Td>{appointment.name}</Td>
                <Td>{appointment.age}</Td>
                <Td>{appointment.day}</Td>
                <Td>{appointment.time}</Td>
                <Td>{appointment.gender}</Td>

                <Td>
                  <Badge
                    colorScheme={
                      appointment.status === "Confirmed"
                        ? "green"
                        : appointment.status === "Pending"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Summary;
