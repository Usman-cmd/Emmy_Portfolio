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

const Contact = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#0a192f" }; // Match About page bg color
  const headingColor = { light: "blue.600", dark: "white" }; // Consistent heading style
  const subTextColor = { light: "gray.500", dark: "#8892b0" };
  const inputBgColor = { light: "#e2e8f0", dark: "#ccd6f6" };
  const inputTextColor = { light: "gray.800", dark: "gray.800" };

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
          justify="center" // Center the form vertically
        >
          <Box pb={8}>
            <Text
              fontSize={{ base: "md", sm: "lg" }}
              color={subTextColor[colorMode]}
              maxW="800px"
            >
              Submit the form below or shoot me an email at{" "}
              <Text as="span" fontWeight="bold">
                emelinemharty@gmail.com
              </Text>
            </Text>
          </Box>

          {/* Form */}
          <Flex w="full" justify="center" px={4}>
            <form
              method="POST"
              action="https://getform.io/f/95a395b5-e421-4da9-bde7-0ea7717032ca"
              style={{ width: "100%" }}
            >
              <Flex flexDir="column" w="full" maxW="600px" mx="auto">
                <Input
                  bg={inputBgColor[colorMode]}
                  color={inputTextColor[colorMode]}
                  placeholder="Your Name"
                  name="name"
                  mb={4}
                  p={2}
                />
                <Input
                  bg={inputBgColor[colorMode]}
                  color={inputTextColor[colorMode]}
                  placeholder="Your Email"
                  type="email"
                  name="email"
                  mb={4}
                  p={2}
                />
                <Textarea
                  bg={inputBgColor[colorMode]}
                  color={inputTextColor[colorMode]}
                  placeholder="Your Message"
                  name="message"
                  rows={6}
                  mb={4}
                  p={2}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="pink"
                  variant="outline"
                  px={8}
                  py={3}
                  mx="auto"
                  _hover={{
                    bg: "pink.600",
                    color: "white",
                    borderColor: "pink.600",
                  }}
                >
                  Let's Collaborate
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Contact;
