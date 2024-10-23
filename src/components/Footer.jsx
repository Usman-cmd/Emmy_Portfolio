import {
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
const lightGradient =
  "linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225))";
const darkGradient =
  "linear-gradient(109.6deg, rgb(6, 2, 2) 32.4%, rgb(137, 30, 47) 98.8%)";

const Footer = () => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("blue.700", "white");
  const bgColor = useColorModeValue(lightGradient, darkGradient);
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bgColor}
      py={4}
      w="100%"
      //borderTop="1px solid"
      borderColor={borderColor}
    >
      <Container maxW={"1140px"}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          alignItems="center"
        >
          {/* Footer Left: Copyright */}
          <HStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={textColor}
              fontFamily={"Baskerville Old Face"}
            >
              © 2024 Emewhin
            </Text>
            <Text
              fontSize="sm"
              fontFamily={"Baskerville Old Face"}
              color={colorMode === "light" ? "gray.500" : "gray.300"}
            >
              All Rights Reserved.
            </Text>
          </HStack>

          {/* Footer Center: Links (Optional) */}
          <HStack
            as="nav"
            spacing={4}
            justifyContent="center"
            mt={{ base: 4, md: 0 }}
          >
            {["Privacy", "Terms", "Contact"].map((link) => (
              <RouterLink key={link} to={`/${link.toLowerCase()}`}>
                <Text
                  fontFamily={"Baskerville Old Face"}
                  fontSize="lg"
                  fontWeight="bold"
                  color={textColor}
                  transition="color 0.3s ease, transform 0.3s ease"
                  _hover={{
                    color: colorMode === "light" ? "blue.700" : "gray.300",
                    transform: "scale(1.1)",
                  }}
                >
                  {link}
                </Text>
              </RouterLink>
            ))}
          </HStack>

          {/* Footer Right: Social Media Links */}
          <HStack spacing={6} mt={{ base: 4, md: 0 }}>
            <a
              href="https://www.facebook.com/profile.php?id=100094554292018"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} color="#1877F2" />{" "}
              {/* Facebook Brand Color */}
            </a>
            <a
              href="https://www.instagram.com/eme.whin?igsh=bnZyYWQ3a3FnZ2pz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} color="#E4405F" />{" "}
              {/* Instagram Brand Color */}
            </a>
            <a
              href="https://www.linkedin.com/in/emelineharty123/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={24} color="#0077B5" />{" "}
              {/* LinkedIn Brand Color */}
            </a>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
