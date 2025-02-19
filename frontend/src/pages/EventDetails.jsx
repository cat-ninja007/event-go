import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Image, Button, Flex, VStack } from "@chakra-ui/react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EventDetail = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/events/${id}`
        );
        setEvent(response.data.data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/public/tickets?eventId=${id}`
        );
        const releasedTickets = response.data.data.filter(
          (ticket) => ticket.isReleased
        );
        setTickets(releasedTickets);
        console.log(releasedTickets)
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      }
    };

    fetchEvent();
    fetchTickets();
  }, [id]);

  if (loading) {
    return (
      <Text fontSize="2xl" textAlign="center" mt="50px">
        Loading event details...
      </Text>
    );
  }

  if (!event) {
    return (
      <Text fontSize="2xl" textAlign="center" mt="50px">
        Event not found
      </Text>
    );
  }

  return (
    <>
      <Header />
      <Box
        position="relative"
        width="100%"
        height="500px"
        overflow="hidden"
        px="60px"
      >
        <Image
          src={event.image}
          width="100%"
          height="100%"
          objectFit="cover"
          rounded="2xl"
          alt={event.title}
        />
        <Flex
          flexDirection="column"
          width="80%"
          color="white"
          position="absolute"
          top="60%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="rgba(0, 0, 0, 0.5)"
          p={5}
          rounded="2xl"
        >
          <Heading fontSize="50px" fontWeight="bold" mb="20px">
            {event.title}
          </Heading>
          <Text fontSize="lg">{event.description}</Text>
        </Flex>
      </Box>

      <Flex px="120px" py="40px" gap="60px">
        <Box w="65%">
          <Heading size="xl" fontWeight="bold" pb="20px">
            Description
          </Heading>
          <Text pb="20px">{event.description}</Text>

          <Heading size="lg" fontWeight="bold" pb="10px">
            Location
          </Heading>
          <Text pb="20px">{event.location}</Text>

          <Heading size="lg" fontWeight="bold" pb="10px">
            Event Date
          </Heading>
          <Text pb="20px">
            {new Date(event.startDate).toLocaleDateString()} -{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </Text>

          <Heading size="lg" fontWeight="bold" pb="10px">
            Organizer
          </Heading>
          <Text>{event.organizer}</Text>
        </Box>

        {/* Ticket Section */}
        <Box w={"35%"}> 
          <Heading size="xl" fontWeight="bold" pb="20px">
            Available Tickets
          </Heading>
          {tickets.length > 0 ? (
            <VStack spacing={5} align="stretch">
              {tickets.map((ticket) => (
                <Box
                  key={ticket.id}
                  p="4"
                  borderWidth="1px"
                  rounded="md"
                  shadow="md"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {ticket.name}
                  </Text>
                  <Text>Price: Rp {ticket.price.toLocaleString("id-ID")}</Text>
                  <Text>Available Seats: {ticket.availableSeat}</Text>
                  <Button bg="#7848F4" color="white" width="100%" mt="2">
                    Buy Ticket
                  </Button>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text>No tickets available</Text>
          )}
        </Box>

        
      </Flex>
      <Footer />
    </>
  );
};

export default EventDetail;

