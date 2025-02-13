import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Container centerContent>
      <Heading>Welcome to Event-Go</Heading>
      <Text mt={4}>This is a public page, accessible by anyone.</Text>
      {user ? (
        <>
          <Text mt={4}>Logged in as: {user.name} ({user.role})</Text>
          <Button mt={4} colorScheme="red" onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Button mt={4} colorScheme="blue" onClick={() => navigate("/login")}>Login</Button>
          <Button mt={4} colorScheme="green" onClick={() => navigate("/register")}>Register</Button>
        </>
      )}
    </Container>
  );
};

export default HomePage;
