import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box minH="90vh">{children}</Box>
      <Footer />
    </Box>
  );
}
