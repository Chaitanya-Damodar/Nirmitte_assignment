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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("doctor");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
        userType,
      });

      const loggedinuser = localStorage.setItem(
        "loggedinuser",
        response.data.email
      );
      if (response.status === 200) {
        const { userType } = response.data;
        toast({
          title: `${
            userType === "doctor" ? "Doctor" : "Patient"
          } login successful!`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate(userType === "doctor" ? "/summary" : "/appointment");
      }
    } catch (error) {
      if (error.response) {
        toast({
          title: "Invalid email or password",
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
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl id="userType" isRequired>
            <FormLabel>Login as</FormLabel>
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
            Log In as {userType === "doctor" ? "Doctor" : "Patient"}
          </Button>
        </VStack>
      </form>

      <Text textAlign="center" mt={4}>
        Not have an account?{" "}
        <Link to="/register" style={{ color: "teal.500", fontWeight: "bold" }}>
          Register here
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
