import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.0.104:3333"
  baseURL: "https://api-bethehero-node.herokuapp.com"
});

export default api;
