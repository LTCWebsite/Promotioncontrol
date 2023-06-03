import axios from "axios";

const AxiosReq = axios.create({
  baseURL: "http://172.28.26.146:1715/",
});
export default AxiosReq;
