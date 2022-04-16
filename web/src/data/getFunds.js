import server from "../utils/axios";

export default function getFunds() {
  return server({
    url: "/companies",
    method: "GET",
  }).then((res) => res.data);
}
