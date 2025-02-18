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
  // FormControl,
  // FormLabel,
  // FormErrorMessage,
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control"; // Incorrect

import { MenuRoot, MenuTrigger, MenuContent, MenuRadioItemGroup, MenuRadioItem } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  // Initialize React Hook Form with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  // Handle form submission
  // const onSubmit = async (data) => {
  //   console.log("Submitting data:", data);

  //   // Ensure role is selected
  //   if (!role) {
  //     setError("role", { type: "manual", message: "Role is required" });
  //     toaster.create({ title: "Please select a role.", type: "error" });
  //     return;
  //   }

  //   data.role = role; // Assign selected role

  //   try {
  //     const response = await axios.post("http://localhost:8080/api/v1/auth/register", data);
  //     console.log("Response:", response.data);

  //     if (response.data.success) {
  //       toaster.create({ title: "Account created successfully!", type: "success" });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log("Error:", error.response?.data);
  //     toaster.create({
  //       title: "Registration failed.",
  //       type: "error",
  //       description: error.response?.data?.message || "Something went wrong.",
  //     });
  //   }
  // };
  const onSubmit = async (data) => {
    console.log("🔥 Form Submitted! Data before validation:", data); // Debugging
  
    // Ensure role is selected
    if (!role || role === "Choose Your Role") {
      setError("role", { type: "manual", message: "Role is required" });
      console.log("🚨 Error: Role is required!");
      return;
    }
  
    data.role = role; // Assign selected role
    console.log("✅ Final Data Sent to API:", data);
  
    // Stop API call for now, just debugging
    return;
  };

  return (
    <Flex>
      {/* Left Side Image Section */}
      <Box position="relative" width={{ base: "100%", md: "600px" }} height="100vh" overflow="hidden" display={{ base: "none", md: "block" }}>
        <Image src="signup.jpg" width="100%" height="100%" objectFit="cover" />
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          width="80%"
          color="white"
        >
          <Text fontSize="40px" fontWeight="bold" mb="40px">Hello Friend</Text>
          <Text fontSize="16px" mb="40px" shadow="xl">To keep connected with us, provide us with your information</Text>
          <Button as={RouterLink} to="/signin" bg="gray.600/90" width="30%" height="49px" rounded="md" color="white" _hover={{ bg: "whiteAlpha.400" }}>
            Sign in
          </Button>
        </Flex>
      </Box>

      {/* Right Side Form Section */}
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" p={{ base: 6, md: 8 }} backgroundColor="#F8F8FA">
        <Card.Root maxWidth="100%" p={6} border="none" backgroundColor="#F8F8FA">
          <Card.Header>
            <Card.Title textAlign="center" fontSize="2xl" marginBottom="40px" as={RouterLink} to="/" _hover={{ cursor: "pointer" }}>
              Event <Text as="span" color="#7848F4">Go</Text>
            </Card.Title>
            <Card.Description textAlign="center" fontSize="4xl" fontWeight="bold" marginBottom="60px">
              Sign Up to Event Go
            </Card.Description>
          </Card.Header>

          {/* Sign Up Form */}
          <Card.Body as="form" onSubmit={handleSubmit(onSubmit)} marginBottom="40px" padding="0px">
            <Stack gap="10" w="full">
              {/* Name Field */}
              <FormControl isInvalid={errors.name}>
                <FormLabel>YOUR NAME</FormLabel>
                <Input {...register("name", { required: "Name is required" })} backgroundColor="white" border="1px solid #ccc" placeholder="Enter your name" height="50px" _focus={{ borderColor: "#7848F4", boxShadow: "0 0 0 1px #7848F4" }} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              {/* Email Field */}
              <FormControl isInvalid={errors.email}>
                <FormLabel>YOUR EMAIL</FormLabel>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email format" }
                  })}
                  backgroundColor="white"
                  border="1px solid #ccc"
                  placeholder="Enter your email"
                  height="50px"
                  _focus={{ borderColor: "#7848F4", boxShadow: "0 0 0 1px #7848F4" }}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              {/* Password Field */}
              <FormControl isInvalid={errors.password}>
                <FormLabel>YOUR PASSWORD</FormLabel>
                <Input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                  type="password"
                  backgroundColor="white"
                  border="1px solid #ccc"
                  placeholder="Enter your password"
                  height="50px"
                  _focus={{ borderColor: "#7848F4", boxShadow: "0 0 0 1px #7848F4" }}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              {/* Role Selection */}
              <FormControl isInvalid={errors.role}>
                <FormLabel>YOUR ROLE</FormLabel>
                <MenuRoot>
                  <MenuTrigger asChild>
                    <Button variant="solid" size="sm" borderWidth="1px" borderColor="#7848F4" backgroundColor="white" color="#7848F4" width="100%" textAlign="left">
                      {role || "Choose Your Role"}
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuRadioItemGroup value={role} onValueChange={setRole}>
                      <MenuRadioItem value="ATTENDEE">Attendee</MenuRadioItem>
                      <MenuRadioItem value="ORGANIZER">Organizer</MenuRadioItem>
                    </MenuRadioItemGroup>
                  </MenuContent>
                </MenuRoot>
                <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </Card.Body>

          {/* Submit Button */}
          <Card.Footer justifyContent="center" display="flex" flexDirection="column" padding="0px">
            <Button type="submit" isLoading={isSubmitting} backgroundColor="#7848F4" color="white" height="50px" _hover={{ bg: "#5b32d6" }} width="100%">
              Sign Up
            </Button>
          </Card.Footer>
        </Card.Root>
      </Box>
    </Flex>
  );
};

export default SignUp;



// import React, { useState } from "react";
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
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
// } from "@chakra-ui/form-control";
// import { useForm } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { toaster } from "../components/ui/toaster";

// import {
//   MenuContent,
//   MenuRadioItem,
//   MenuRadioItemGroup,
//   MenuRoot,
//   MenuTrigger,
// } from "@chakra-ui/react";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [role, setRole] = useState("Choose Your Role");

//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   // Handle form submission
//   const onSubmit = async (data) => {
//     console.log("Submitted Data:", data);
//     if (role === "Choose Your Role") {
//       toaster.create({
//         title: "Please select a role.",
//         type: "error",
//       });
//       return;
//     }

//     data.role = role; // Assign selected role

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/auth/register",
//         data
//       );
//       console.log("Response:", response.data); // ✅ Debugging

//       if (response.data.success) {
//         toaster.create({
//           title: "Account created successfully!",
//           type: "success",
//         });

//         navigate("/");
//       }
//     } catch (error) {
//       console.log("Error:", error.response?.data);
//       toaster.create({
//         title: "Registration failed.",
//         type: "error",
//         description: error.response?.data?.message || "Something went wrong.",
//       });
//     }
//   };
//   return (
//     <Flex>
//       {/* Left Side Image Section */}
//       <Box
//         position={"relative"}
//         width={{ base: "100%", md: "600px" }}
//         height="100vh"
//         overflow="hidden"
//         display={{ base: "none", md: "block" }}
//       >
//         <Image src="signup.jpg" width="100%" height="100%" objectFit="cover" />

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
//             Hello Friend
//           </Text>
//           <Text fontSize={"16px"} mb={"40px"} shadow={"xl"}>
//             To keep connected with us, provide us with your information
//           </Text>
//           <Button
//             as={RouterLink}
//             to="/"
//             bg={"gray.600/90"}
//             width={"30%"}
//             height={"49px"}
//             rounded={"md"}
//             color="white"
//             _hover={{ bg: "whiteAlpha.400" }}
//           >
//             Signin
//           </Button>
//         </Flex>
//       </Box>

//       {/* Right Side Form Section */}
//       <Box
//         flex="1"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         p={{ base: 6, md: 8 }}
//         backgroundColor={"#F8F8FA"}
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
//               _hover={{ cursor: "pointer" }}
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
//               Sign Up to Event Go
//             </Card.Description>
//           </Card.Header>

//           {/* Sign Up Form */}
//           <Card.Body
//             as="form"
//             onSubmit={handleSubmit(onSubmit)}
//             marginBottom={"40px"}
//             padding={"0px"}
//           >
//             <Stack gap="10" w="full">
//               {/* Name Field */}
//               <FormControl isInvalid={errors.name}>
//                 <FormLabel>YOUR NAME</FormLabel>
//                 <Input
//                   {...register("name", { required: "Name is required" })}
//                   backgroundColor="white"
//                   border="1px solid #ccc"
//                   placeholder="Enter your name"
//                   height="50px"
//                   _focus={{
//                     borderColor: "#7848F4",
//                     boxShadow: "0 0 0 1px #7848F4",
//                   }}
//                 />
//                 <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
//               </FormControl>

//               {/* Email Field */}
//               <FormControl isInvalid={errors.email}>
//                 <FormLabel>YOUR EMAIL</FormLabel>
//                 <Input
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                       message: "Invalid email format",
//                     },
//                   })}
//                   backgroundColor="white"
//                   border="1px solid #ccc"
//                   placeholder="Enter your email"
//                   height="50px"
//                   _focus={{
//                     borderColor: "#7848F4",
//                     boxShadow: "0 0 0 1px #7848F4",
//                   }}
//                 />
//                 <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
//               </FormControl>

//               {/* Password Field */}
//               <FormControl isInvalid={errors.password}>
//                 <FormLabel>YOUR PASSWORD</FormLabel>
//                 <Input
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                   type="password"
//                   backgroundColor="white"
//                   border="1px solid #ccc"
//                   placeholder="Enter your password"
//                   height="50px"
//                   _focus={{
//                     borderColor: "#7848F4",
//                     boxShadow: "0 0 0 1px #7848F4",
//                   }}
//                 />
//                 <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
//               </FormControl>

//               {/* Role Selection */}
//               <FormControl>
//                 <FormLabel>YOUR ROLE</FormLabel>
//                 <MenuRoot>
//                   <MenuTrigger asChild>
//                     <Button
//                       variant="solid"
//                       size="sm"
//                       borderWidth="1px"
//                       borderColor="#7848F4"
//                       backgroundColor="white"
//                       color="#7848F4"
//                       width="100%"
//                       textAlign="left"
//                     >
//                       {role}
//                     </Button>
//                   </MenuTrigger>
//                   <MenuContent>
//                   <MenuRadioItemGroup value={role} onValueChange={(e) => setRole(e.value)}>
//                       <MenuRadioItem value="ATTENDEE">Attendee</MenuRadioItem>
//                       <MenuRadioItem value="ORGANIZER">Organizer</MenuRadioItem>
//                     </MenuRadioItemGroup>
//                   </MenuContent>
//                 </MenuRoot>
//               </FormControl>
//             </Stack>
//           </Card.Body>

//           {/* Submit Button */}
//           <Card.Footer
//             justifyContent="center"
//             display="flex"
//             flexDirection="column"
//             padding="0px"
//           >
//             <Button
//               type="submit"
//               isLoading={isSubmitting}
//               backgroundColor="#7848F4"
//               color="white"
//               height="50px"
//               _hover={{ bg: "#5b32d6", cursor: "pointer" }}
//               width="100%"
//             >
//               Sign Up
//             </Button>
//             <Text color="gray.500" textAlign="center" marginTop="20px">
//               Already have an account?{" "}
//               <Link
//                 as={RouterLink}
//                 to="/"
//                 color="#7848F4"
//                 textDecoration="underline"
//               >
//                 Sign In
//               </Link>
//             </Text>
//           </Card.Footer>
//         </Card.Root>
//       </Box>
//     </Flex>

//     // <Flex>
//     //   <Box
//     //     position={"relative"}
//     //     width={{ base: "100%", md: "600px" }}
//     //     height="100vh"
//     //     overflow="hidden"
//     //     display={{ base: "none", md: "block" }}
//     //   >
//     //     <Image src="signup.jpg" width="100%" height="100%" objectFit="cover" />

//     //     {/* Overlay Content */}
//     //     <Flex
//     //       position="absolute"
//     //       top="50%"
//     //       left="50%"
//     //       transform="translate(-50%, -50%)"
//     //       flexDirection="column"
//     //       alignItems="center"
//     //       textAlign={"center"}
//     //       width={"80%"}
//     //       color="white"
//     //     >
//     //       <Text fontSize={"40px"} fontWeight={"bold"} mb={"40px"}>
//     //         Hello Friend
//     //       </Text>
//     //       <Text fontSize={"16px"} mb={"40px"} shadow={"xl"}>
//     //         To keep connected with us, provide us with your information
//     //       </Text>
//     //       <Button
//     //         as={RouterLink}
//     //         to="/"
//     //         bg={"gray.600/90"}
//     //         width={"30%"}
//     //         height={"49px"}
//     //         rounded={"md"}
//     //         color="white"
//     //         _hover={{ bg: "whiteAlpha.400" }}
//     //       >
//     //         Signin
//     //       </Button>
//     //     </Flex>
//     //   </Box>
//     //   <Box
//     //     flex="1"
//     //     display="flex"
//     //     alignItems="center"
//     //     justifyContent="center"
//     //     p={{ base: 6, md: 8 }}
//     //     backgroundColor={"#F8F8FA"}
//     //   >
//     //     <Card.Root
//     //       maxWidth="100%"
//     //       p={6}
//     //       border={"none"}
//     //       backgroundColor={"#F8F8FA"}
//     //     >
//     //       <Card.Header>
//     //         <Card.Title
//     //           textAlign="center"
//     //           fontSize={"2xl"}
//     //           marginBottom={"40px"}
//     //           as={RouterLink}
//     //           to="/"
//     //           _hover={{ cursor: "pointer"}}
//     //         >
//     //           Event{" "}
//     //           <Text as="span" color={"#7848F4"}>
//     //             Go
//     //           </Text>
//     //         </Card.Title>
//     //         <Card.Description
//     //           textAlign={"center"}
//     //           fontSize={"4xl"}
//     //           fontWeight={"bold"}
//     //           marginBottom={"60px"}
//     //         >
//     //           Sign Up to Event Go
//     //         </Card.Description>
//     //       </Card.Header>
//     //       <Card.Body marginBottom={"40px"} padding={"0px"}>
//     //         <Stack gap="10" w="full">
//     //           <Field label="YOUR NAME" width={{ base: "full", md: "400px" }}>
//     //             <Input
//     //               backgroundColor={"white"}
//     //               border={"none"}
//     //               placeholder="Enter your name"
//     //             />
//     //           </Field>
//     //           <Field label="YOUR EMAIL" width={{ base: "full", md: "400px" }}>
//     //             <Input
//     //               backgroundColor={"white"}
//     //               border={"none"}
//     //               placeholder="Enter your email"
//     //             />
//     //           </Field>
//     //           <Field
//     //             label="YOUR PASSWORD"
//     //             width={{ base: "full", md: "400px" }}
//     //           >
//     //             <Input
//     //               backgroundColor={"white"}
//     //               border={"none"}
//     //               placeholder="Enter your password"
//     //             />
//     //           </Field>
//     //           <Field label="YOUR ROLE" width={{ base: "full", md: "400px" }}>
//     //             <MenuRoot>
//     //               <MenuTrigger asChild>
//     //                 <Button
//     //                   variant={"solid"}
//     //                   size={"sm"}
//     //                   borderWidth={"1px"}
//     //                   borderColor={"#7848F4"}
//     //                   backgroundColor={"white"}
//     //                   color={"#7848F4"}
//     //                   width={{ base: "full", md: "400px" }}
//     //                   textAlign={"left"}
//     //                 >
//     //                   {role}
//     //                 </Button>
//     //               </MenuTrigger>

//     //               <MenuContent>
//     //                 <MenuRadioItemGroup
//     //                   value={role}
//     //                   onValueChange={(e) => setRole(e.value)}
//     //                   width={{ base: "full", md: "400px" }}
//     //                 >
//     //                   <MenuRadioItem value="User">User</MenuRadioItem>
//     //                   <MenuRadioItem value="Organizer">Organizer</MenuRadioItem>
//     //                 </MenuRadioItemGroup>
//     //               </MenuContent>
//     //             </MenuRoot>
//     //           </Field>
//     //         </Stack>
//     //       </Card.Body>
//     //       <Card.Footer justifyContent="center" display={"flex"} flexDirection={"column"} padding={"0px"}>
//     //         <Button variant="solid" backgroundColor={"#7848F4"} width={"100%"}>
//     //           Sign Up
//     //         </Button>
//     //         <Text color={"gray.500"} display={{base: "flex", md: "none"}}>
//     //           Already have an account?<Link href="/" display={"inline"} color={"gray.500"} cursor={"pointer"} textDecoration={"underline"}>Sign In</Link>
//     //         </Text>

//     //       </Card.Footer>
//     //     </Card.Root>
//     //   </Box>
//     // </Flex>
//   );
// };

// export default SignUp;
