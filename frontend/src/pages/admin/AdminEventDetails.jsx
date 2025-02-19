import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Image, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AdminEventDetail = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token here
        const response = await axios.get(`http://localhost:8080/api/v1/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data.data);
        console.log(token)
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <Text fontSize="2xl" textAlign="center" mt="50px">Loading event details...</Text>;
  }

  if (!event) {
    return <Text fontSize="2xl" textAlign="center" mt="50px">Event not found</Text>;
  }

  return (
    <>
      <Header />
      <Box position="relative" width="100%" height="500px" overflow="hidden" px="60px">
        <Image src={event.image} width="100%" height="100%" objectFit="cover" rounded="2xl" alt={event.title} />
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
          <Heading size="xl" fontWeight="bold" pb="20px">Description</Heading>
          <Text pb="20px">{event.description}</Text>

          <Heading size="lg" fontWeight="bold" pb="10px">Location</Heading>
          <Text pb="20px">{event.location}</Text>

          <Heading size="lg" fontWeight="bold" pb="10px">Event Date</Heading>
          <Text pb="20px">
            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
          </Text>

          <Heading size="lg" fontWeight="bold" pb="10px">Organizer</Heading>
          <Text>{event.organizer}</Text>
        </Box>

        <Box w="35%">
          <Button display="block" width="100%" bg="#7848F4" h="50px" py="15px" mb="20px" color="white">Buy Now</Button>
          <Button display="block" width="100%" paddingY="15px" mb="20px" h="50px">Add to Cart</Button>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default AdminEventDetail;



// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Box, Heading, Text, Image, Button, Flex } from "@chakra-ui/react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const EventDetail = () => {
//   const { id } = useParams(); // Get event ID from URL
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/v1/events/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEvent(response.data.data);
//         console.log(response);
//       } catch (error) {
//         console.error("Failed to fetch event", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   if (loading) {
//     return <Text fontSize="2xl">Loading event details...</Text>;
//   }

//   if (!event) {
//     return <Text fontSize="2xl">Event not found</Text>;
//   }

//   return (
//     <>
//       <Header />
//       <Box position="relative" width="100%" height="596px" overflow="hidden" px="60px">
//         <Image src={event.image} width="100%" height="100%" objectFit="cover" rounded="2xl" alt={event.title} />
//         <Flex
//           flexDirection="column"
//           width="80%"
//           color="white"
//           position="absolute"
//           top="70%"
//           left="50%"
//           transform="translate(-50%, -50%)"
//         >
//           <Heading fontSize="60px" fontWeight="bold" mb="40px">
//             {event.title}
//           </Heading>
//           <Text fontSize="lg" color="white" w="50%" bg="rgba(0, 0, 0, 0.5)" rounded="2xl" p={5}>
//             {event.description}
//           </Text>
//         </Flex>
//       </Box>
      
//       <Flex px="120px" py="40px" gap="60px">
//         <Box w="65%">
//           <Heading size="2xl" fontWeight="bold" pb="20px">Description</Heading>
//           <Text pb="40px">{event.description}</Text>
//           <Heading size="2xl" fontWeight="bold" pb="20px">Location</Heading>
//           <Text>{event.location}</Text>
//           <Heading size="2xl" fontWeight="bold" pb="20px">Event Date</Heading>
//           <Text>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</Text>
//           <Heading size="2xl" fontWeight="bold" pt="40px" pb="20px">Organizer</Heading>
//           <Text>{event.organizer}</Text>
//         </Box>

//         <Box w="35%">
//           <Button display="block" width="100%" bg="#7848F4" h="50px" py="15px" mb="20px">Buy Now</Button>
//           <Button display="block" width="100%" paddingY="15px" mb="20px" h="50px">Add to Cart</Button>
//         </Box>
//       </Flex>
//       <Footer />
//     </>
//   );
// };

// export default EventDetail;



// import { useParams } from "react-router-dom";
// import { Box, Heading, Text, Image, Button, Flex } from "@chakra-ui/react";
// // import eventData from "../data/eventData";
// import eventData from "../data/eventData";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const EventDetail = () => {
//   const { id } = useParams(); // Get event ID from URL
//   const event = eventData.find((e) => e.id === parseInt(id)); // Find event by ID

//   if (!event) {
//     return <Text fontSize="2xl">Event not found</Text>;
//   }

//   return (
//     <>
//       <Header />
//       <Box
//         position={"relative"}
//         width={{ base: "100%", md: "100%" }}
//         height="596px"
//         overflow="hidden"
//         display={{ base: "none", md: "block" }}
//         px={"60px"}
//       >
//         <Image
//           src={event.image}
//           width="100%"
//           height="100%"
//           objectFit="cover"
//           rounded={"2xl"}
//           alt={event.title}
//         />

//         {/* Overlay Content */}
//         <Flex
//           flexDirection="column"
//           width={"80%"}
//           color="white"
//           position="absolute"
//           top="70%"
//           left="50%"
//           transform="translate(-50%, -50%)"
//         >
//           <Heading fontSize={"60px"} fontWeight={"bold"} mb={"40px"}>
//             {event.title}
//           </Heading>
//           <Text
//             fontSize="lg"
//             color="white"
//             w={"50%"}
//             backgroundColor={"rgba(0, 0, 0, 0.5)"}
//             rounded={"2xl"}
//             p={5}
//           >
//             {event.description.length > 100
//               ? event.description.substring(0, 100) + "..."
//               : event.description}
//           </Text>
//         </Flex>
//       </Box>
      
//       <Flex px={"120px"} py={"40px"} gap={"60px"}>
        
//         {/* Description */}
//         <Box w={"65%"}>
//           <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Description</Heading>
//           <Text pb={"40px"}>{event.description}</Text>
//           <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Hours</Heading>
//           <Text>Weekday hour: 7PM - 10PM</Text>
//           <Text>Sunday hour: 7PM - 10PM</Text>
//           <Heading size={"2xl"} fontWeight={"bold"} pt={"40px"} pb={"20px"}>Organizer Contact</Heading>
//           <Text>Please go to www.sneakypeeks.com and refer the FAQ section for more detail</Text>
//         </Box>

//         {/* Event Location */}
//         <Box w={"35%"}>
          
//           <Button display={"block"} width={"100%"} backgroundColor={"#7848F4"} h={"50px"} py={"15px"} mb={"20px"}>Buy Now</Button>
//           <Button display={"block"} width={"100%"} paddingY={"15px"} mb={"20px"} h={"50px"}>Add to Cart</Button>
//           <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Event Location</Heading>
//           <Text>{event.location}</Text>
//           <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Event Date</Heading>
//           <Text>{event.date}</Text>
//           <Heading size={"2xl"} fontWeight={"bold"} pb={"20px"}>Tags</Heading>
//           <Text>{event.tags}</Text>
//         </Box>
//       </Flex>
//       <Footer />
//     </>
//   );
// };

// export default EventDetail;
