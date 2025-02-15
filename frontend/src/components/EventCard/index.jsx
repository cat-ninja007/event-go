import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const EventCard = ({
  id,
  title,
  description,
  price,
  onBuy,
  onAddToCart,
  image,
}) => {
  return (
    <Card.Root maxW="32%" overflow="hidden">
      <Image src={image} alt={title} height={"240px"} />
      <Card.Body gap="2">
        <Card.Title as={RouterLink} to={`/event/${id}`}>
          {title}
        </Card.Title>
        <Card.Description>
          {/* {description} */}
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
        Rp {price.toLocaleString("id-ID")}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={onBuy}>
          Buy now
        </Button>
        <Button variant="ghost" onClick={onAddToCart}>
          Add to cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default EventCard;
