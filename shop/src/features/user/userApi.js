import axios from "axios";

let baseUrl = "http://localhost:5000/api/users";

export const login_getNewToken = (user) => {
  return axios.post(`${baseUrl}/login`, user);
};
export const registerInServer = (user) => {
  return axios.post(`${baseUrl}`, user);
};
