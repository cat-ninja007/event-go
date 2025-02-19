import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
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
// import eventData from "../data/eventData";


import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events
        const response = await axios.get(
          "http://localhost:8080/api/v1/events/datatable"
        );
        const eventsData = response.data.data;

        // Fetch released tickets for each event
        const eventsWithTickets = await Promise.all(
          eventsData.map(async (event) => {
            try {
              const ticketResponse = await axios.get(
                `http://localhost:8080/api/v1/public/tickets?eventId=${event.id}`
              );

              // Filter only released tickets
              const releasedTickets = ticketResponse.data.data.filter(
                (ticket) => ticket.isReleased
              );
              console.log(`Event: ${event.title} (ID: ${event.id})`);
              console.log("Released Tickets:", releasedTickets);

              return { ...event, tickets: releasedTickets };
            } catch (ticketError) {
              console.error(
                `Failed to fetch tickets for event ID: ${event.id}`,
                ticketError
              );
              return { ...event, tickets: [] };
            }
          })
        );

        // Set the final event list with released tickets
        setEvents(eventsWithTickets);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <>
      <Box>
        <Header />

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

          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }}
            gap={6}
            mb="60px"
          >
            {events.length > 0 ? (
              events.map((event) => (
                <GridItem key={event.id}>
                  <EventCard {...event} tickets={event.tickets || []} />
                </GridItem>
              ))
            ) : (
              <Text>No events available</Text>
            )}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
