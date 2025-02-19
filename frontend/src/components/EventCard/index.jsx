import { Button, Box, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const EventCard = ({ id, title, description, image, tickets = [] }) => {
  // console.log(`Event ID: ${id}, Tickets received:`, tickets);

  // Ensure tickets exist before filtering
  const releasedTickets = tickets.filter(ticket => ticket.isReleased);
  // console.log("Released Tickets:", releasedTickets);

  // Determine price display logic
  let priceDisplay = "Price not available";
  if (releasedTickets.length === 1) {
    priceDisplay = `Rp ${releasedTickets[0].price.toLocaleString("id-ID")}`;
  } else if (releasedTickets.length > 1) {
    const prices = releasedTickets.map(ticket => ticket.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    priceDisplay = `Rp ${minPrice.toLocaleString("id-ID")} - Rp ${maxPrice.toLocaleString("id-ID")}`;
  }

  // console.log("Price Display:", priceDisplay);


  return (
    <Box
      as="div"
      width={"100%"} // Responsive width
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
          {priceDisplay}
        </Text>
      </Box>

      <Box p="4" display="flex" justifyContent="space-between">
        <Button flex="1" colorScheme="purple" mr="2">
          Buy now
        </Button>
        <Button as={RouterLink} to={`../../events/${id}`} flex="1" variant="outline" colorScheme="purple">
          View Event
        </Button>
      </Box>
    </Box>
  );
};

export default EventCard;