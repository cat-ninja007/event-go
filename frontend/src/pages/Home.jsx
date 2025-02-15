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
import { Field } from "../components/ui/field";
// import { Link } from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import EventCard from "../components/EventCard";
import EventCard from "../components/EventCard";

const Home = () => {
  return (
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

        <Flex gap={"20px"} flexWrap={"wrap"} mb={"60px"}>
          <EventCard
            image={"https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D"} 
            title="Belajar Kelompok Wibu"
            description={"Tempat wibu belajar menjadi menjadi seorang hacker. Jangan lupa jaket abu-abu dan kacamata."}
            price={"$450"}
            onBuy={() => alert("Buying Modern Sofa")}
            onAddToCart={() => alert("Added Modern Sofa to cart")}
          />
          <EventCard
            image={"https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEZpZ2h0fGVufDB8fDB8fHwy"}
            title="Wibu Kelahi"
            description="Tempat para wibu adu jotos dan pamer jutsu. Merasa cool dan psycopath tak perlu diragukan lagi"
            price="$250"
            onBuy={() => alert("Buying Wooden Chair")}
            onAddToCart={() => alert("Added Wooden Chair to cart")}
          />
          <EventCard
            image={"https://images.unsplash.com/photo-1483917841983-f83104f9ffa5?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEZpZ2h0fGVufDB8fDB8fHwy"}
            title="Wibu Debus"
            description="Dukun-dukun Wibu bersatu untuk menjadi clan Uchiha. Jika anda salah satunya, ayo bergabung."
            price="$250"
            onBuy={() => alert("Buying Wooden Chair")}
            onAddToCart={() => alert("Added Wooden Chair to cart")}
          />
          <EventCard
            image={"https://images.unsplash.com/photo-1527437445244-7e10c0f68034?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2xhcHxlbnwwfHwwfHx8Mg%3D%3D"}
            title="Aku Wibu"
            description="Dukun-dukun Wibu bersatu untuk menjadi clan Uchiha. Jika anda salah satunya, ayo bergabung."
            price="$250"
            onBuy={() => alert("Buying Wooden Chair")}
            onAddToCart={() => alert("Added Wooden Chair to cart")}
          />
          <EventCard
            image={"https://images.unsplash.com/photo-1550701035-c0bb32de8aca?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFya291cnxlbnwwfHwwfHx8Mg%3D%3D"}
            title="Wibu Parkour"
            description="Dukun-dukun Wibu bersatu untuk menjadi clan Uchiha. Jika anda salah satunya, ayo bergabung."
            price="$250"
            onBuy={() => alert("Buying Wooden Chair")}
            onAddToCart={() => alert("Added Wooden Chair to cart")}
          />
          <EventCard
            image={"https://images.unsplash.com/photo-1508686546564-a142a9b633ba?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0JTIwZmFsbHxlbnwwfHwwfHx8Mg%3D%3D"}
            title="Senandung Wibu"
            description="Dukun-dukun Wibu bersatu untuk menjadi clan Uchiha. Jika anda salah satunya, ayo bergabung."
            price="$250"
            onBuy={() => alert("Buying Wooden Chair")}
            onAddToCart={() => alert("Added Wooden Chair to cart")}
          />
        </Flex>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
