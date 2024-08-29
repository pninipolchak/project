import axios from "axios";

let baseUrl = 'http://0.0.0.0:8000/get_data';

export const getData = () => {
    return axios.get( baseUrl );
}