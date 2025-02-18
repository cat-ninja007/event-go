import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import eventData from "../data/eventData";
import Logout from "../components/Logout";

const Home = () => {
  return (
    <Box>
      <Header />
      <Logout />

      <Box
        position={"relative"}
        width={{ base: "100%", md: "100%" }}
        height="596px"
        overflow="hidden"
        display={{ base: "none", md: "block" }}
        px={"60px"}
      >
        <Image
          src="signup.jpg"
          width="100%"
          height="100%"
          objectFit="cover"
          rounded={"2xl"}
        />

        {/* Overlay Content */}
        <Flex
          flexDirection="column"
          alignItems="center"
          textAlign={"center"}
          width={"80%"}
          color="white"
          position="absolute"
          top="30%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text fontSize={"60px"} fontWeight={"bold"} mb={"40px"}>
            MADE FOR THOSE <br /> WHO DO
          </Text>
        </Flex>
      </Box>

      <Box px={"120px"} py={"30px"} justifyContent={"space-between"}>
        <Flex py={"30px"}>
          <Heading size={"3xl"}>
            Upcoming{" "}
            <Heading display={"inline"} size={"3xl"} color={"#7848F4"}>
              Events
            </Heading>
          </Heading>
        </Flex>

        <Flex gap={"20px"} flexWrap={"wrap"} mb={"60px"}>
          
          {
            eventData.map((event) => (
              <EventCard key={event.id} {...event} />
            ))
          }
        </Flex>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
