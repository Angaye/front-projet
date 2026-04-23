import { userApi } from "./api";

export const registerUser = async (userData) => {
  return await userApi.post(
    "/users/register",
    userData
  );
};

export const loginUser = async (credentials) => {
  return await userApi.post(
    "/users/login",
    credentials
  );
};

export const getProfile = async (token) => {
  return await userApi.get(
    "/users/me",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};