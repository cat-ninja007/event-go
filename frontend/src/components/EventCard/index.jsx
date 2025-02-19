import { Button, Box, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const EventCard = ({ id, title, description, ticketPrice, image }) => {
  return (
    <Box
      as="div"
      maxW={{ base: "100%", sm: "48%", md: "32%" }} // Responsive width
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl" }} // Hover effect
    >
      <Image src={image} alt={title} height="240px" width={500} objectFit="cover" />
      
      <Box p="4" display="flex" flexDirection="column" gap="2">
        <Text as={RouterLink} to={`../../events/${id}`} fontSize="xl" fontWeight="bold" noOfLines={1}>
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </Text>
        <Text fontSize="lg" fontWeight="medium" letterSpacing="tight" mt="2">
          Rp {ticketPrice.toLocaleString("id-ID")}
        </Text>
      </Box>

      <Box p="4" display="flex" justifyContent="space-between">
        <Button flex="1" colorScheme="purple" mr="2">
          Buy now
        </Button>
        <Button flex="1" variant="outline" colorScheme="purple">
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default EventCard;


// import { Button, Card, Image, Text } from "@chakra-ui/react";
// import { Link as RouterLink } from "react-router-dom";

// const EventCard = ({ id, title, description, ticketPrice, image }) => {
//   return (
//     <Card.Root maxW="32%" overflow="hidden">
//       <Image src={image} alt={title} height="240px" />
//       <Card.Body gap="2">
//         <Card.Title as={RouterLink} to={`/event/${id}`}>
//           {title}
//         </Card.Title>
//         <Card.Description>
//           {description.length > 100 ? description.substring(0, 100) + "..." : description}
//         </Card.Description>
//         <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
//           Rp {ticketPrice.toLocaleString("id-ID")}
//         </Text>
//       </Card.Body>
//       <Card.Footer gap="2">
//         <Button variant="solid">Buy now</Button>
//         <Button variant="ghost">Add to cart</Button>
//       </Card.Footer>
//     </Card.Root>
//   );
// };

// export default EventCard;


// import { Button, Card, Image, Text } from "@chakra-ui/react";
// import { Link as RouterLink } from "react-router-dom";

// const EventCard = ({
//   id, title, description, ticketPrice, image
// }) => {
//   return (
//     <Card.Root maxW="32%" overflow="hidden">
//       <Image src={image} alt={title} height={"240px"} />
//       <Card.Body gap="2">
//         <Card.Title as={RouterLink} to={`/events/${id}`}>
//           {title}
//         </Card.Title>
//         <Card.Description>
//           {/* {description} */}
//           {description.length > 100
//             ? description.substring(0, 100) + "..."
//             : description}
//         </Card.Description>
//         <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
//         Rp {ticketPrice.toLocaleString("id-ID")}
//         </Text>
//       </Card.Body>
//       <Card.Footer gap="2">
//         <Button variant="solid" onClick={onBuy}>
//           Buy now
//         </Button>
//         <Button variant="ghost" onClick={onAddToCart}>
//           Add to cart
//         </Button>
//       </Card.Footer>
//     </Card.Root>
//   );
// };

// export default EventCard;
