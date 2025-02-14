import React from "react";
import {
  Box,
  Card,
  Button,
  Input,
  Stack,
  Flex,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import {Link as RouterLink}  from "react-router-dom";

const SignIn = () => {
  return (
    <Flex>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        backgroundColor={"#F8F8FA"}
      >
        <Card.Root
          width="80%"
          p={6}
          border={"none"}
          backgroundColor={"#F8F8FA"}
        >
          <Card.Header>
            <Card.Title
              textAlign="center"
              fontSize={"2xl"}
              marginBottom={"40px"}
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
              Sign In to Event Go
            </Card.Description>
          </Card.Header>
          <Card.Body marginBottom={"40px"}>
            <Stack gap="10" w="full">
              <Field label="YOUR EMAIL">
                <Input
                  backgroundColor={"white"}
                  border={"none"}
                  placeholder="Enter your email"
                />
              </Field>
              <Box>
                <Flex justify="space-between" align="center" mb="1">
                  <Text fontWeight="bold">PASSWORD</Text>
                  <Link
                    href="#"
                    fontSize="sm"
                    color="gray.500"
                    _hover={{ color: "blue.500" }}
                  >
                    Forgot your password?
                  </Link>
                </Flex>
                <Input
                  backgroundColor="white"
                  border="none"
                  placeholder="Enter your password"
                />
              </Box>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="center">
            <Button variant="solid" backgroundColor={"#7848F4"} width={"257px"}>
              Sign In
            </Button>
          </Card.Footer>
        </Card.Root>
      </Box>
      <Box position={"relative"} width={600} height="100vh" overflow="hidden">
        <Image src="signin.jpg" width="100%" height="100%" objectFit="cover" />

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
          <Text fontSize={"40px"} fontWeight={"bold"} mb={"40px"}>Welcome back</Text>
          <Text fontSize={"16px"} mb={"40px"} shadow={"xl"}>To keep connected with us, provide us with your information</Text>
          <Button as={RouterLink} to="/SignUp" bg={"gray.600/90"} width={"30%"} height={"49px"} rounded={"md"} color="white" _hover={{ bg: "whiteAlpha.400" }}>
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignIn;
