import axios from "./_api";

export const loginUser = (userBody) => axios.post("/users/login", userBody);
export const signupUser = (userBody) => axios.post("/users/signup", userBody);
export const getMe = () => axios.get("/users/me");