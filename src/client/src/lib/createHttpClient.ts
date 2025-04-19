import axios from "axios";
import apiConfig from "./api";
import queryString from "query-string";

const API = apiConfig.baseUrl;

const createHttpClient = (path: string = "") => {
  const httpClient = axios.create({
    baseURL: `${API}/${path}`,
    timeout: 10000,
    paramsSerializer: (params) => queryString.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return httpClient;
};

export default createHttpClient;
