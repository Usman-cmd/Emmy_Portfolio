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

const Footer = () => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("blue.500", "white");
  const bgColor = useColorModeValue("white", "#0a192f");
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
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              © 2024 Emewhin
            </Text>
            <Text
              fontSize="sm"
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
                  fontSize="lg"
                  fontWeight="bold"
                  color={textColor}
                  transition="color 0.3s ease, transform 0.3s ease"
                  _hover={{
                    color: colorMode === "light" ? "blue.600" : "gray.300",
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
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} color="#1DA1F2" />{" "}
              {/* Twitter Brand Color */}
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
