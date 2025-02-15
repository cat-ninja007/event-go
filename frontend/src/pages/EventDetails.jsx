import { useParams } from "react-router-dom";
import { Box, Heading, Text, Image, Button, Flex } from "@chakra-ui/react";
// import eventData from "../data/eventData";
import eventData from "../data/eventData";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EventDetail = () => {
  const { id } = useParams(); // Get event ID from URL
  const event = eventData.find((e) => e.id === parseInt(id)); // Find event by ID

  if (!event) {
    return <Text fontSize="2xl">Event not found</Text>;
  }

  return (
    <>
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
          src={event.image}
          width="100%"
          height="100%"
          objectFit="cover"
          rounded={"2xl"}
          alt={event.title}
        />

        {/* Overlay Content */}
        <Flex
          flexDirection="column"
          width={"80%"}
          color="white"
          position="absolute"
          top="70%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Heading fontSize={"60px"} fontWeight={"bold"} mb={"40px"}>
            {event.title}
          </Heading>
          <Text
            fontSize="lg"
            color="white"
            w={"50%"}
            backgroundColor={"rgba(0, 0, 0, 0.5)"}
            rounded={"2xl"}
            p={5}
          >
            {event.description.length > 100
              ? event.description.substring(0, 100) + "..."
              : event.description}
          </Text>
        </Flex>
      </Box>
      
      <Flex px={"120px"} py={"40px"} gap={"60px"}>
        
        {/* Description */}
        <Box w={"65%"}>
          <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Description</Heading>
          <Text pb={"40px"}>{event.description}</Text>
          <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Hours</Heading>
          <Text>Weekday hour: 7PM - 10PM</Text>
          <Text>Sunday hour: 7PM - 10PM</Text>
          <Heading size={"2xl"} fontWeight={"bold"} pt={"40px"} pb={"20px"}>Organizer Contact</Heading>
          <Text>Please go to www.sneakypeeks.com and refer the FAQ section for more detail</Text>
        </Box>

        {/* Event Location */}
        <Box w={"35%"}>
          
          <Button display={"block"} width={"100%"} backgroundColor={"#7848F4"} h={"50px"} py={"15px"} mb={"20px"}>Buy Now</Button>
          <Button display={"block"} width={"100%"} paddingY={"15px"} mb={"20px"} h={"50px"}>Add to Cart</Button>
          <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Event Location</Heading>
          <Text>{event.location}</Text>
          <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Event Date</Heading>
          <Text>{event.date}</Text>
          <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Tags</Heading>
          <Text>{event.tags}</Text>
        </Box>
      </Flex>

      {/* <Box p={6}>
        <Heading mt={4}>{event.title}</Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          {event.description}
        </Text>
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          ${event.price}
        </Text>
        <Button mt={6} colorScheme="teal">
          Buy Now
        </Button>
      </Box> */}
      <Footer />
    </>
  );
};

export default EventDetail;
