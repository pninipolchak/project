import axios from "axios";

let baseUrl = 'http://localhost:5000/api/products';

// export const getProduct = () => {
//     return axios.get( baseUrl );
// }
export const getProduct = (page,perPage) => {
    return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}`);
}
export const getProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}
export const deleteProduct = (id, token) => {
    return axios.delete(`${baseUrl}/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
}
export const addProduct = (product, token) => {
    return axios.post(baseUrl, product, {
      headers: {
        "x-access-token": token,
      },
    });
  };  
export const updateProduct = (id,product, token) => {
    return axios.put(`${baseUrl}/${id}`, product, {
      headers: {
        "x-access-token": token,
      },
    });
  };  
