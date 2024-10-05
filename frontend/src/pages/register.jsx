import React, { useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("doctor");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login/register`, {
        username,
        email,
        password,
        userType,
      });

      if (response.status === 201) {
        toast({
          title: "Registration successful!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast({
          title: "Error during registration. Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "An error occurred. Please try again later.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      w={{ base: "90%", md: "400px" }}
      p={8}
      mx="auto"
      mt="100px"
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.100"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Register
      </Heading>
      <form onSubmit={handleRegister}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>

          <FormControl id="userType" isRequired>
            <FormLabel>Register as</FormLabel>
            <Select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              placeholder="Select user type"
            >
              <option value="doctor">I am a Doctor</option>
              <option value="patient">I am a Patient</option>
            </Select>
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Register as {userType === "doctor" ? "Doctor" : "Patient"}
          </Button>
        </VStack>
      </form>

      <Text textAlign="center" mt={4}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "teal.500", fontWeight: "bold" }}>
          Log in here
        </Link>
      </Text>
    </Box>
  );
};

export default Register;
