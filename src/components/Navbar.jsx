import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  Box,
  VStack,
  IconButton,
  SlideFade,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Updated
import { useState } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("blue.700", "white");
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const navigate = useNavigate();

  const navButtonStyle = {
    fontSize: { base: "24px", md: "18px" },
    fontWeight: "bold",
    color: textColor,
    cursor: "pointer",
    transition: "color 0.3s ease, transform 0.3s ease",
    _hover: {
      color: colorMode === "light" ? "blue.700" : "gray.300",
      transform: "scale(1.1)",
    },
  };
  const lightGradient =
    "linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225))";
  const darkGradient =
    "linear-gradient(109.6deg, rgb(6, 2, 2) 32.4%, rgb(137, 30, 47) 98.8%)";

  return (
    <Box
      bg={colorMode === "light" ? lightGradient : darkGradient}
      py={4}
      w="100%"
      zIndex="10"
    >
      <Container maxW={"1140px"}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent="space-between"
          flexDir={{ base: "row", sm: "row" }}
        >
          {/* Left: Emewhin Title */}
          <HStack
            spacing={4}
            justify={{ base: "center", sm: "flex-start" }}
            align="center"
          >
            <Text
              fontSize={{ base: "28px", sm: "36px", md: "40px" }}
              fontFamily="'Raleway', sans-serif"
              fontWeight={"bold"}
              textTransform={"uppercase"}
              textAlign={"center"}
              color={textColor}
              letterSpacing="wide"
              textShadow="3px 3px 5px rgba(0, 0, 0, 0.3)"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.1)",
                textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <RouterLink to="/about">Emewhin</RouterLink>
            </Text>
          </HStack>

          {/* Center: Navigation Links */}
          <HStack
            as="nav"
            spacing={8}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            justify="center"
            flexGrow={1}
          >
            {["about", "work", "exhibition", "contact"].map((section) => (
              <RouterLink key={section} to={`/${section}`}>
                <Text {...navButtonStyle} fontFamily={"Baskerville Old Face"}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Text>
              </RouterLink>
            ))}
          </HStack>

          {/* Right: Theme Toggle Button and Hamburger Menu */}
          <HStack
            spacing={{ base: 2, md: 4 }}
            alignItems={"center"}
            justify="flex-end"
          >
            <Button
              variant="outline"
              onClick={toggleColorMode}
              size={{ base: "lg", md: "md" }} // Ensure this size matches the IconButton
              padding={{ base: "10px", md: "8px" }}
            >
              {colorMode === "light" ? (
                <IoMoon size="25" />
              ) : (
                <LuSun size="25" />
              )}
            </Button>
            <IconButton
              icon={nav ? <FaTimes /> : <FaBars />}
              onClick={handleClick}
              display={{ base: "flex", md: "none" }}
              aria-label="Toggle Navigation Menu"
              size={{ base: "lg", md: "md" }} // Match size with the toggle button
              variant="outline"
              zIndex={20}
              position="relative"
              right="0"
            />
          </HStack>
        </Flex>

        {/* Mobile Menu */}

        {nav && (
          <VStack
            as="nav"
            pos="fixed"
            top={0}
            left={0}
            w="full"
            h="100vh"
            bg={colorMode === "light" ? lightGradient : darkGradient}
            justifyContent="center"
            alignItems="center"
            spacing={8}
            overflow="hidden"
            zIndex={20}
            transition="all 0.4s ease"
          >
            <IconButton
              icon={<FaTimes />}
              aria-label="Close Menu"
              onClick={handleClick}
              size="lg"
              variant="outline"
              mb={4}
              transition="transform 0.4s ease"
              _hover={{
                transform: "scale(1.2)",
              }}
            />
            {["about", "work", "exhibition", "contact"].map((section) => (
              <RouterLink
                key={section}
                to={`/${section}`}
                onClick={handleClick}
              >
                <Text
                  {...navButtonStyle}
                  fontSize={{ base: "28px", md: "24px" }}
                  fontFamily={"Baskerville Old Face"}
                  _hover={{ transform: "scale(1.2)" }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Text>
              </RouterLink>
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
