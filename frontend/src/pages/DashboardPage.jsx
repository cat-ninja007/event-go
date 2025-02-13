// src/pages/DashboardPage.js

import { Container, Heading, Text } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <Container centerContent>
      <Heading>Admin Dashboard</Heading>
      <Text mt={4}>Only accessible by admins.</Text>
    </Container>
  );
};

export default DashboardPage;
