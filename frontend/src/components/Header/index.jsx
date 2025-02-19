import React from "react";
import {
  Container,
  Button,
  Flex,
  Text,
  Heading,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    localStorage.removeItem("role"); // Remove role if stored
    localStorage.clear();
    navigate("/"); // Redirect to sign-in page
  };

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      py="30px"
      px="120px"
    >
      <Flex>
        <Heading as={RouterLink} to="/" color="black" size="3xl">
          Event{" "}
          <Text display="inline" color="#7848F4">
            Go
          </Text>
        </Heading>
      </Flex>

      <Flex gap="20px">
        {token ? (
          <>
          {/* Cart Icon with Hover Effect */}
          <Box
              as={RouterLink}
              to="/cart"
              _hover={{ color: "#7848F4" }}
              transition="color 0.3s ease"
            >
              <FaShoppingCart size={24} color="black" />
            </Box>

            {/* Account Icon with Hover Effect */}
            <Box
              as={RouterLink}
              to="/profile"
              _hover={{ color: "#7848F4" }} 
              transition="color 0.3s ease"
            >
              <FaUser size={24} color="black"/>
            </Box>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              colorScheme="red"
              _hover={{ fontWeight: "bold", color: "red.600" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Login and Signup Buttons */}
            <Button
              variant="outline"
              outlineColor="#7848F4"
              _hover={{ fontWeight: "bold", color: "#7848F4" }}
              px="30px"
              as={RouterLink}
              to="/signin"
            >
              Login
            </Button>
            <Button
              variant="solid"
              backgroundColor="#7848F4"
              _hover={{ fontWeight: "bold" }}
              px="30px"
              as={RouterLink}
              to="/signup"
            >
              Sign Up
            </Button>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default Header;

// import React from "react";
// import {
//   Box,
//   Card,
//   Container,
//   Button,
//   Input,
//   Icon,
//   Stack,
//   Flex,
//   Image,
//   Text,
//   Link,
//   Heading,
// } from "@chakra-ui/react";
// import { Field } from "../ui/field";
// import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
// import { Link as RouterLink } from "react-router-dom";

// const Header = () => {
//   return(
//     <Container
//         display={"flex"}
//         justifyContent={"space-between"}
//         py={"30px"}
//         px={"120px"}
//       >
//         <Flex>
//           <Heading as={RouterLink} to={"/"} color={"black"} size={"3xl"}>
//             Event{" "}
//             <Text display={"inline"} color={"#7848F4"}>
//               Go
//             </Text>
//           </Heading>
//         </Flex>
//         <Flex gap={"20px"}>
//           <Button
//             variant={"outline"}
//             outlineColor={"#7848F4"}
//             _hover={{ fontWeight: "bold", color: "#7848F4" }}
//             px={"30px"}
//             as={RouterLink}
//             to="/signin"
//           >
//             Login
//           </Button>
//           <Button
//             variant={"solid"}
//             backgroundColor={"#7848F4"}
//             _hover={{ fontWeight: "bold" }}
//             px={"30px"}
//             as={RouterLink}
//             to="/signup"
//           >
//             Sign Up
//           </Button>
//         </Flex>
//       </Container>
//   )
// }

// export default Header;
