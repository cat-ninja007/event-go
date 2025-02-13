// src/pages/LoginPage.js

import { useState } from "react";
import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Container centerContent>
      <Heading>Login</Heading>
      <Input mt={4} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input mt={4} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <Text color="red.500">{error}</Text>}
      <Button mt={4} colorScheme="blue" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default LoginPage;
