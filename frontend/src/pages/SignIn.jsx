import { useState, useEffect } from "react";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ORGANIZER") {
      navigate("/admin-dashboard");
    } else if (role === "ATTENDEE") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Ensure credentials are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Login Response:", response.data); // Debugging Log
  
      const { accessToken, role } = response.data.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);
  
      if (role === "ORGANIZER") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message);
      setError("Invalid email or password");
    }
  };
  
  

  return (
    <Flex>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 6, md: 8 }}
        backgroundColor={"#F8F8FA"}
        height={{ base: "100vh", md: "auto" }}
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
              _hover={{ cursor: "pointer" }}
            >
              Event <Text as="span" color={"#7848F4"}>Go</Text>
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
          <Card.Body marginBottom={"40px"} padding={"0px"}>
            <Stack gap="10" width={"100%"}>
              <Field label="YOUR EMAIL" width={{ base: "full", md: "400px" }}>
                <Input
                  backgroundColor={"white"}
                  border={"none"}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field
                label="YOUR PASSWORD"
                width={{ base: "full", md: "400px" }}
              >
                <Input
                  backgroundColor={"white"}
                  border={"none"}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </Stack>
            {error && <Text color="red.500">{error}</Text>}
          </Card.Body>
          <Card.Footer
            justifyContent="center"
            display={"flex"}
            flexDirection={"column"}
            padding={"0px"}
          >
            <Button
              variant="solid"
              backgroundColor={"#7848F4"}
              width={"100%"}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Text color={"gray.500"} display={{ base: "flex", md: "none" }}>
               Don't have an account?
               <Link
                 href="/SignUp"
                 display={"inline"}
                 color={"gray.500"}
                 cursor={"pointer"}
                 textDecoration={"underline"}
               >
                 Sign Up
               </Link>
             </Text>
          </Card.Footer>
        </Card.Root>
      </Box>

      <Box
        position={"relative"}
        width={{ base: "100%", md: "600px" }}
        height="100vh"
        overflow="hidden"
        display={{ base: "none", md: "block" }}
      >
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
          <Text fontSize={"40px"} fontWeight={"bold"} mb={"40px"}>
            Welcome back
          </Text>
          <Text fontSize={"16px"} mb={"40px"} shadow={"xl"}>
            To keep connected with us, provide us with your information
          </Text>
          <Button
            as={RouterLink}
            to="/SignUp"
            bg={"gray.600/90"}
            width={"30%"}
            height={"49px"}
            rounded={"md"}
            color="white"
            _hover={{ bg: "whiteAlpha.400" }}
          >
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignIn;



// import React from "react";
// import {
//   Box,
//   Card,
//   Button,
//   Input,
//   Stack,
//   Flex,
//   Image,
//   Text,
//   Link,
// } from "@chakra-ui/react";
// import { Field } from "../components/ui/field";
// import { Link as RouterLink } from "react-router-dom";

// const SignIn = () => {
//   return (
//     <Flex>
//       <Box
//         flex="1"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         p={{ base: 6, md: 8 }}
//         backgroundColor={"#F8F8FA"}
//         height={{ base: "100vh", md: "auto" }}
//       >
//         <Card.Root
//           maxWidth="100%"
//           p={6}
//           border={"none"}
//           backgroundColor={"#F8F8FA"}
//         >
//           <Card.Header>
//             <Card.Title
//               textAlign="center"
//               fontSize={"2xl"}
//               marginBottom={"40px"}
//               as={RouterLink}
//               to="/"
//               _hover={{ cursor: "pointer"}}
//             >
//               Event{" "}
//               <Text as="span" color={"#7848F4"}>
//                 Go
//               </Text>
//             </Card.Title>
//             <Card.Description
//               textAlign={"center"}
//               fontSize={"4xl"}
//               fontWeight={"bold"}
//               marginBottom={"60px"}
//             >
//               Sign In to Event Go
//             </Card.Description>
//           </Card.Header>
//           <Card.Body marginBottom={"40px"} padding={"0px"}>
//             <Stack gap="10" width={"100%"}>
//               <Field label="YOUR EMAIL" width={{ base: "full", md: "400px" }}>
//                 <Input
//                   backgroundColor={"white"}
//                   border={"none"}
//                   placeholder="Enter your email"
//                 />
//               </Field>
//               <Field
//                 label="YOUR PASSWORD"
//                 width={{ base: "full", md: "400px" }}
//               >
//                 <Input
//                   backgroundColor={"white"}
//                   border={"none"}
//                   placeholder="Enter your password"
//                 />
//               </Field>
//             </Stack>
//           </Card.Body>
//           <Card.Footer
//             justifyContent="center"
//             display={"flex"}
//             flexDirection={"column"}
//             padding={"0px"}
//           >
//             <Button variant="solid" backgroundColor={"#7848F4"} width={"100%"}>
//               Sign In
//             </Button>
//             <Text color={"gray.500"} display={{ base: "flex", md: "none" }}>
//               Don't have an account?
//               <Link
//                 href="/SignUp"
//                 display={"inline"}
//                 color={"gray.500"}
//                 cursor={"pointer"}
//                 textDecoration={"underline"}
//               >
//                 Sign Up
//               </Link>
//             </Text>
//           </Card.Footer>
//         </Card.Root>
//       </Box>
//       <Box
//         position={"relative"}
//         width={{ base: "100%", md: "600px" }}
//         height="100vh"
//         overflow="hidden"
//         display={{ base: "none", md: "block" }}
//       >
//         <Image src="signin.jpg" width="100%" height="100%" objectFit="cover" />

//         {/* Overlay Content */}
//         <Flex
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%, -50%)"
//           flexDirection="column"
//           alignItems="center"
//           textAlign={"center"}
//           width={"80%"}
//           color="white"
//         >
//           <Text fontSize={"40px"} fontWeight={"bold"} mb={"40px"}>
//             Welcome back
//           </Text>
//           <Text fontSize={"16px"} mb={"40px"} shadow={"xl"}>
//             To keep connected with us, provide us with your information
//           </Text>
//           <Button
//             as={RouterLink}
//             to="/SignUp"
//             bg={"gray.600/90"}
//             width={"30%"}
//             height={"49px"}
//             rounded={"md"}
//             color="white"
//             _hover={{ bg: "whiteAlpha.400" }}
//           >
//             Sign Up
//           </Button>
//         </Flex>
//       </Box>
//     </Flex>
//   );
// };

// export default SignIn;
