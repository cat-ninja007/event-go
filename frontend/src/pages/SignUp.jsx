import React, { useState } from "react";
import {
  Box,
  Card,
  Button,
  Input,
  Stack,
  Flex,
  Image,
  Text,
  Link
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Link as RouterLink } from "react-router-dom";
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";

const SignUp = () => {
  const [role, setRole] = useState("Choose Your Role");
  return (
    <Flex>
      <Box
        position={"relative"}
        width={{ base: "100%", md: "600px" }}
        height="100vh"
        overflow="hidden"
        display={{ base: "none", md: "block" }}
      >
        <Image src="signup.jpg" width="100%" height="100%" objectFit="cover" />

        {/* Overlay Content */}
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          flexDirection="column"
          alignItems="center"
          textAlign={"center"}
          width={"80%"}
          color="white"
        >
          <Text fontSize={"40px"} fontWeight={"bold"} mb={"40px"}>
            Hello Friend
          </Text>
          <Text fontSize={"16px"} mb={"40px"} shadow={"xl"}>
            To keep connected with us, provide us with your information
          </Text>
          <Button
            as={RouterLink}
            to="/"
            bg={"gray.600/90"}
            width={"30%"}
            height={"49px"}
            rounded={"md"}
            color="white"
            _hover={{ bg: "whiteAlpha.400" }}
          >
            Signin
          </Button>
        </Flex>
      </Box>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 6, md: 8 }}
        backgroundColor={"#F8F8FA"}
      >
        <Card.Root
          maxWidth="100%"
          p={6}
          border={"none"}
          backgroundColor={"#F8F8FA"}
        >
          <Card.Header>
            <Card.Title
              textAlign="center"
              fontSize={"2xl"}
              marginBottom={"40px"}
              as={RouterLink}
              to="/"
              _hover={{ cursor: "pointer"}}
            >
              Event{" "}
              <Text as="span" color={"#7848F4"}>
                Go
              </Text>
            </Card.Title>
            <Card.Description
              textAlign={"center"}
              fontSize={"4xl"}
              fontWeight={"bold"}
              marginBottom={"60px"}
            >
              Sign Up to Event Go
            </Card.Description>
          </Card.Header>
          <Card.Body marginBottom={"40px"} padding={"0px"}>
            <Stack gap="10" w="full">
              <Field label="YOUR NAME" width={{ base: "full", md: "400px" }}>
                <Input
                  backgroundColor={"white"}
                  border={"none"}
                  placeholder="Enter your name"
                />
              </Field>
              <Field label="YOUR EMAIL" width={{ base: "full", md: "400px" }}>
                <Input
                  backgroundColor={"white"}
                  border={"none"}
                  placeholder="Enter your email"
                />
              </Field>
              <Field
                label="YOUR PASSWORD"
                width={{ base: "full", md: "400px" }}
              >
                <Input
                  backgroundColor={"white"}
                  border={"none"}
                  placeholder="Enter your password"
                />
              </Field>
              <Field label="YOUR ROLE" width={{ base: "full", md: "400px" }}>
                <MenuRoot>
                  <MenuTrigger asChild>
                    <Button
                      variant={"solid"}
                      size={"sm"}
                      borderWidth={"1px"}
                      borderColor={"#7848F4"}
                      backgroundColor={"white"}
                      color={"#7848F4"}
                      width={{ base: "full", md: "400px" }}
                      textAlign={"left"}
                    >
                      {role}
                    </Button>
                  </MenuTrigger>

                  <MenuContent>
                    <MenuRadioItemGroup
                      value={role}
                      onValueChange={(e) => setRole(e.value)}
                      width={{ base: "full", md: "400px" }}
                    >
                      <MenuRadioItem value="User">User</MenuRadioItem>
                      <MenuRadioItem value="Organizer">Organizer</MenuRadioItem>
                    </MenuRadioItemGroup>
                  </MenuContent>
                </MenuRoot>
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="center" display={"flex"} flexDirection={"column"} padding={"0px"}>
            <Button variant="solid" backgroundColor={"#7848F4"} width={"100%"}>
              Sign Up
            </Button>
            <Text color={"gray.500"} display={{base: "flex", md: "none"}}>
              Already have an account?<Link href="/" display={"inline"} color={"gray.500"} cursor={"pointer"} textDecoration={"underline"}>Sign In</Link>
            </Text>
            
          </Card.Footer>
        </Card.Root>
      </Box>
    </Flex>
  );
};

export default SignUp;
