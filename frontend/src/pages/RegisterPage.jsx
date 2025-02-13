// src/pages/RegisterPage.js

import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    setMessage("Registration successful! Please login.");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Container centerContent>
      <Heading>Register</Heading>
      <Input mt={4} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input mt={4} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {message && <Text color="green.500">{message}</Text>}
      <Button mt={4} colorScheme="green" onClick={handleRegister}>Register</Button>
    </Container>
  );
};

export default RegisterPage;
