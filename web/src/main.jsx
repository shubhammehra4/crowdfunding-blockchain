import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import GloabContextWrapper from "./contexts/global";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#B794F4",
      500: "#B794F4",
    },
  },
});

/**
 * TODO: Create Global Context (shared state) - M
 * TODO: Integarte API calls - M & N
 * TODO: Get getails from contract address (caching needed) - S
 * TODO: Create other forms - M
 * TODO: Vote for request - S (with cache invalidation)
 */

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GloabContextWrapper>
        <App />
      </GloabContextWrapper>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
