import { setAuth, setAuthError } from "./authSlice";
import { login as loginApi, signup as signupApi } from "../services/authService";

export const login = (credentials) => async (dispatch) => {
  try {
    const data = await loginApi(credentials);
    localStorage.setItem("token", data.token);
    dispatch(setAuth({ user: data.user, token: data.token }));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      dispatch(setAuthError("Session expired. Please login again."));
    } else {
      dispatch(setAuthError("Login failed. Check credentials."));
    }
    throw err;
  }
};

export const signup = (info) => async (dispatch) => {
  try {
    await signupApi(info);
    // redirect to login after signup
  } catch (err) {
    dispatch(setAuthError("Signup failed. Try again."));
    throw err;
  }
};
