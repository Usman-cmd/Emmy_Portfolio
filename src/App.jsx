import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Exhibition from "./components/Exhibition";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exhibition" element={<Exhibition />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
