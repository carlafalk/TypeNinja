import axios from "axios";

export const axiosAPI = axios.create({
    baseURL: "https://localhost:7220/"
  })