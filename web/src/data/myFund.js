import server from "../utils/axios";

export default function myFund() {
  return server({
    url: "/companies/:owner_address",
    method: "GET",
  }).then((res) => res.data);
}
