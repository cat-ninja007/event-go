import { Button, Card, Image, Text } from "@chakra-ui/react"

const EventCard = ({ title, description, price, onBuy, onAddToCart, image}) => {
  return (
    <Card.Root maxW="32%" overflow="hidden">
      <Image
        src={image}
        alt={title}
        height={"240px"}
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={onBuy}>Buy now</Button>
        <Button variant="ghost" onClick={onAddToCart}>Add to cart</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default EventCard;