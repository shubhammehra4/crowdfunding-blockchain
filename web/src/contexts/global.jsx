import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const server = axios.create({ baseURL: "http://localhost:5000" });
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } } });

const GlobalContext = createContext(null);

const GloabContextWrapper = ({ children }) => {
  const [funds, setFunds] = useState([]);
  const [defaultAccount, setDefaultAccount] = useState(undefined);

  const getFund = (contract_address) => {
    return funds.find((fund) => fund.contract_address === contract_address);
  };

  const myFunds = (owner_address) => {
    return funds.find((fund) => fund.owner_address === owner_address);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{ server, queryClient, setFunds, getFund, defaultAccount, setDefaultAccount, myFunds}}
      >
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export default GloabContextWrapper;
export const useGlobalContext = () => useContext(GlobalContext);
