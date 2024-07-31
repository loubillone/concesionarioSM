import axios from "axios";

const testApi = axios.create({
  baseURL: "http://localhost:8090",
});

export default testApi;
