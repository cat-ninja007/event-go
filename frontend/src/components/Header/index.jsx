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

const Header = () => {
  return(
    <Container
        display={"flex"}
        justifyContent={"space-between"}
        py={"30px"}
        px={"120px"}
      >
        <Flex>
          <Heading color={"black"} size={"3xl"}>
            Event{" "}
            <Text display={"inline"} color={"#7848F4"}>
              Go
            </Text>
          </Heading>
        </Flex>
        <Flex gap={"20px"}>
          <Button
            variant={"outline"}
            outlineColor={"#7848F4"}
            _hover={{ fontWeight: "bold", color: "#7848F4" }}
            px={"30px"}
            as={RouterLink}
            to="/signin"
          >
            Login
          </Button>
          <Button
            variant={"solid"}
            backgroundColor={"#7848F4"}
            _hover={{ fontWeight: "bold" }}
            px={"30px"}
            as={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </Flex>
      </Container>
  )
}

export default Header;