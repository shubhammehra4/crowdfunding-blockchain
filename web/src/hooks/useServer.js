import axios from "axios";

export const serverURL = "localhost:5000";

const useServer = () => {
  const server = axios.create({
    baseURL: serverURL,
    hideError: false,
  });

  return server;
};

export default useServer;
