import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:5000" });

export default server;
