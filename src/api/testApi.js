import axios from "axios";

const testApi = axios.create({
  baseURL: "http://localhost:8090",
});

testApi.interceptors.request.use((config) => {
  config.headers = {
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default testApi;
