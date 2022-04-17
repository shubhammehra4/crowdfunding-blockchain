import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import getFunds from "../data/getFunds";

const server = axios.create({ baseURL: "http://localhost:5000" });

const GlobalContext = createContext(null);

const GloabContextWrapper = ({ children }) => {
  const { data: funds, isLoading, refetch: refetchFunds } = useQuery("funds", getFunds);
  const [defaultAccount, setDefaultAccount] = useState(undefined);

  const getFund = (contract_address) => {
    return funds.find((fund) => fund.contract_address === contract_address);
  };

  const myFunds = () => {
    if (isLoading || defaultAccount === undefined) return [];
    return funds.filter(
      (fund) => fund.owner_address.toLowerCase() === defaultAccount.toLowerCase()
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        server,
        funds,
        refetchFunds,
        getFund,
        defaultAccount,
        setDefaultAccount,
        myFunds,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GloabContextWrapper;
export const useGlobalContext = () => useContext(GlobalContext);
