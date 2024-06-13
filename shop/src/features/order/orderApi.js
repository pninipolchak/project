import axios from "axios"; 

let baseUrl = 'http://localhost:5000/api/orders';

export const saveOrderInServer = (order, token) => {
  return axios.post(baseUrl, order, {
    headers: {
      "x-access-token": token,
    },
  });
};



