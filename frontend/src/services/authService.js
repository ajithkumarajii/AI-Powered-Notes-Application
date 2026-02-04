import axios from "./api";

export const login = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data;
};

export const signup = async (data) => {
  const res = await axios.post("/auth/signup", data);
  return res.data;
};
