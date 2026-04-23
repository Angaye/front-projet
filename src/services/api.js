import axios from "axios";

export const userApi = axios.create({
  baseURL: "http://localhost:8002",
  headers: {
    "Content-Type": "application/json"
  }
});

export const seriesApi = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});