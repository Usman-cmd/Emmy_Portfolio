import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useColorMode,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaFacebook,
} from "react-icons/fa"; // Import social media icons

// Importing necessary libraries for the form functionality
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import process from "process";

const Contact = () => {
  const { colorMode } = useColorMode();
  const lightGradient =
    "linear-gradient(to right, rgb(255,192,203), rgb(255, 221, 225))";
  const darkGradient =
    "linear-gradient(109.6deg, rgb(6, 2, 2) 32.4%, rgb(137, 30, 47) 98.8%)";
  const bgColor = { light: lightGradient, dark: darkGradient }; // Match About page bg color
  const headingColor = { light: "blue.700", dark: "white" }; // Consistent heading style
  const subTextColor = { light: "#590d22", dark: "#8892b0" };
  const inputBgColor = { light: "#e2e8f0", dark: "#ccd6f6" };
  const inputTextColor = { light: "black", dark: "black" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = (params) => {
    const toastId = toast.loading("Sending your message, please wait...");
    console.log(import.meta.env.VITE_PUBLIC_SERVICE_ID);

    const serviceId = import.meta.env.VITE_PUBLIC_SERVICE_ID;
    const templateId = import.meta.env.VITE_PUBLIC_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_PUBLIC_KEY;

    console.log("Service ID:", serviceId);
    console.log("Template ID:", templateId);
    console.log("Public Key:", publicKey);

    emailjs
      .send(serviceId, templateId, params, publicKey) // Only pass publicKey, not as an object
      .then(
        () => {
          toast.success(
            "I have received your message, I will get back to you soon!",
            {
              id: toastId,
            }
          );
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error(
            "There was an error sending your message, please try again later!",
            {
              id: toastId,
            }
          );
        }
      );
  };

  const onSubmit = (data) => {
    const templateParams = {
      to_name: "Usman",
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };

    sendEmail(templateParams);
  };

  return (
    <Box
      name="contact"
      w="full"
      minH="100vh"
      bg={bgColor[colorMode]}
      pt={{ base: "24px", sm: "48px" }} // Align with About page start
      pb={{ base: "40px", sm: "60px" }}
    >
      <Container maxW="container.xl" mx="auto" px={8}>
        {/* Page Introduction */}
        <Flex flexDir="column" alignItems="center" textAlign="center" mb={8}>
          <Flex justify="center" alignItems="center" mb={4}>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
              fontWeight="bold"
              color={headingColor[colorMode]}
              fontFamily={"Baskerville Old Face"}
              mr={4} // Add some margin to the right for spacing
            >
              Get In Touch
            </Heading>
          </Flex>
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={subTextColor[colorMode]}
            maxW="800px"
            mb={6}
            fontFamily={"Baskerville Old Face"}
          >
            Whether you want to discuss a project, ask questions, or just say
            hi, I’d love to hear from you! You can reach me through the form
            below or via my social media platforms.
          </Text>
          {/* Social Media Icons */}
          <HStack spacing={4}>
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/emelineharty123/"
              aria-label="LinkedIn"
              icon={<FaLinkedin color="#0077B5" />}
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                transform: "scale(1.1)",
                transition: "all 0.3s ease",
              }}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/eme.whin?igsh=bnZyYWQ3a3FnZ2pz"
              aria-label="Instagram"
              icon={<FaInstagram color="#E4405F" />}
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                transform: "scale(1.1)",
                transition: "all 0.3s ease",
              }}
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/profile.php?id=100094554292018"
              aria-label="Facebook"
              icon={<FaFacebook color="#1877F2" />}
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                transform: "scale(1.1)",
                transition: "all 0.3s ease",
              }}
            />
          </HStack>
        </Flex>

        {/* Center: Contact Form Section */}
        <Flex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          w="full"
          justify="center"
        >
          <Box pb={8}>
            <Text
              fontSize={{ base: "md", sm: "lg" }}
              color={subTextColor[colorMode]}
              fontFamily={"Baskerville Old Face"}
              maxW="800px"
            >
              Submit the form below or shoot me an email at{" "}
              <Text
                as="span"
                fontWeight="bold"
                fontFamily={"Baskerville Old Face"}
              >
                emelinemharty@gmail.com
              </Text>
            </Text>
          </Box>

          {/* New form functionality added here */}
          <Toaster richColors={true} />
          <motion.form
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.3, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%" }} // Keeping the existing design's full width
          >
            <Flex flexDir="column" w="full" maxW="600px" mx="auto">
              {/* Name Input */}
              <>
                <style>
                  {`
                    input::placeholder, textarea::placeholder {
                    color: #7393B3; /* Placeholder color */
                          } 
                `}
                </style>
                <motion.input
                  variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                  type="text"
                  placeholder="name"
                  {...register("name", {
                    required: "This field is required!",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long.",
                    },
                  })}
                  className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
                  style={{
                    backgroundColor: inputBgColor[colorMode],
                    color: inputTextColor[colorMode],
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                  }}
                />
                {errors.name && (
                  <span className="inline-block self-start text-accent">
                    {errors.name.message}
                  </span>
                )}
              </>

              {/* Email Input */}
              <motion.input
                variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                type="email"
                placeholder="email"
                {...register("email", {
                  required: "This field is required!",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email.",
                  },
                })}
                className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
                style={{
                  backgroundColor: inputBgColor[colorMode],
                  color: inputTextColor[colorMode],
                  padding: "12px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                }}
              />
              {errors.email && (
                <span className="inline-block self-start text-accent">
                  {errors.email.message}
                </span>
              )}

              {/* Message Input */}
              <motion.textarea
                variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                placeholder="message"
                rows={6}
                {...register("message", {
                  required: "This field is required!",
                })}
                className="w-full p-2 rounded-md shadow-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg"
                style={{
                  backgroundColor: inputBgColor[colorMode],
                  color: inputTextColor[colorMode],
                  padding: "12px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                }}
              />
              {errors.message && (
                <span className="inline-block self-start text-accent">
                  {errors.message.message}
                </span>
              )}

              {/* Submit Button */}
              <motion.button
                variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                type="submit"
                className="bg-primary text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "transparent", // Transparent background for "outline" effect
                  color: "#D53F8C", // Pink color for text and border
                  width: "250px",
                  display: "block", // Ensure it's block-level
                  margin: "0 auto",
                  padding: "8px 24px", // Adjust padding to make the button smaller
                  border: "2px solid #D53F8C", // Pink border
                  borderRadius: "8px", // Keep the rounded corners
                  fontFamily: "Baskerville Old Face", // Font style as before
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D53F8C"; // Pink background on hover
                  e.currentTarget.style.color = "white"; // White text on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"; // Transparent background when hover ends
                  e.currentTarget.style.color = "#D53F8C"; // Pink text when hover ends
                }}
              >
                Let's Collaborate
              </motion.button>
            </Flex>
          </motion.form>
        </Flex>
      </Container>
    </Box>
  );
};

export default Contact;
