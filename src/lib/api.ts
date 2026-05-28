import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const setAuthHeader = (userId: string | null) => {
  if (userId) {
    api.defaults.headers.common["x-user-id"] = userId;
  } else {
    delete api.defaults.headers.common["x-user-id"];
  }
};
