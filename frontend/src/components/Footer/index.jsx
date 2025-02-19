import React from "react";
import {
  Box,
  Card,
  Container,
  Button,
  Input,
  Icon,
  Stack,
  Flex,
  Image,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return(
    <Container  maxW={'100%'} backgroundColor={"#10107B"} height={"auto"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          fontWeight={"bold"}
          fontSize={"40px"}
          pt={"30px"}
        >
          <Text color={"white"}>
            Event{" "}
            <Text display={"inline"} color={"#7848F4"}>
              Go
            </Text>
          </Text>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
          pt={"30px"}
        >
          <Field width={{ base: "full", md: "290px" }}>
            <Input
              backgroundColor={"white"}
              border={"none"}
              placeholder="Enter your email"
            />
          </Field>
          <Button variant="solid" backgroundColor={"#7848F4"}>
            Subscribe
          </Button>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
          py={"30px"}
        >
          <Link href="/" color={"white"} py={"10px"} px={"20px"}>
            Home
          </Link>
          <Link href="/" color={"white"} py={"10px"} px={"20px"}>
            About
          </Link>
          <Link href="/" color={"white"} py={"10px"} px={"20px"}>
            Services
          </Link>
          <Link href="/" color={"white"} py={"10px"} px={"20px"}>
            Get in touch
          </Link>
          <Link href="/" color={"white"} py={"10px"} px={"20px"}>
            FAQs
          </Link>
        </Box>

        <hr />

        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          py={"23px"}
        >
          <Flex>
            <Link
              href="/"
              color={"white"}
              paddingX={"19px"}
              paddingY={"10px"}
              backgroundColor={"none"}
              _hover={{ fontWeight: "bold" }}
              _active={{ backgroundColor: "#7848F4", rounded: "md" }}
            >
              English
            </Link>
            <Link
              href="/"
              color={"white"}
              paddingX={"19px"}
              paddingY={"10px"}
              backgroundColor={"none"}
              _hover={{ fontWeight: "bold" }}
              _active={{ backgroundColor: "#7848F4", rounded: "md" }}
            >
              French
            </Link>
            <Link
              href="/"
              color={"white"}
              paddingX={"19px"}
              paddingY={"10px"}
              backgroundColor={"none"}
              _hover={{ fontWeight: "bold" }}
              _active={{ backgroundColor: "#7848F4", rounded: "md" }}
            >
              Indonesia
            </Link>
          </Flex>

          <Flex gap={4} justify="center">
            <Link href="https://facebook.com" isExternal>
              <Icon
                as={FaFacebook}
                boxSize={6}
                color="white"
                _hover={{ color: "blue.700" }}
              />
            </Link>
            <Link href="https://twitter.com" isExternal>
              <Icon
                as={FaTwitter}
                boxSize={6}
                color="white"
                _hover={{ color: "blue.600" }}
              />
            </Link>
            <Link href="https://instagram.com" isExternal>
              <Icon
                as={FaInstagram}
                boxSize={6}
                color="white"
                _hover={{ color: "pink.700" }}
              />
            </Link>
            <Link href="https://linkedin.com" isExternal>
              <Icon
                as={FaLinkedin}
                boxSize={6}
                color="white"
                _hover={{ color: "blue.800" }}
              />
            </Link>
          </Flex>

          <Flex>
            <Text color={"white"}>
              Non Copyrighted &copy; 2023 Upload by EventGo
            </Text>
          </Flex>
        </Flex>
      </Container>
  )
}

export default Footer;