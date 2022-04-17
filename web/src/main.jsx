import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import GloabContextWrapper from "./contexts/global";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#7f00ff",
      500: "#7f00ff",
      700: "#7f00ff",
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
      <QueryClientProvider client={queryClient}>
        <GloabContextWrapper>
          <App />
        </GloabContextWrapper>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
