import axios from "axios";

let baseUrl = 'http://localhost:8000/';

export const getData = async() => {
    let response = await axios.get( `${baseUrl}get_data`, { headers: { 'Accept': 'application/json' } });
    return response.data;
}

export const getDataByType = async(dataType) => {
    if (dataType === 'min' || dataType === 'max') {
        let response =await axios.get(`${baseUrl}get_${dataType}_data`);
        return response.data;

    } else {
        throw new Error('Invalid data type. Please provide "low" or "high".');
    }
}