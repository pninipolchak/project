import axios from "axios";

let baseUrl = 'http://0.0.0.0:8000/';

export const getData = () => {
    return axios.get( baseUrl +'get_data');
}
// export const getLowData = () => {
//     return axios.get( baseUrl +'get_high_data');
// }
// export const getHighData = () => {
//     return axios.get( baseUrl +'get_low_data');
// }
// export const getLastData = () => {
//     return axios.get( baseUrl +'get_last_data');
// }
export const getDataByType = (dataType) => {
    if (dataType === 'low' || dataType === 'high' || dataType === 'last') {
        return axios.get(baseUrl + `get_${dataType}_data`);
    } else {
        throw new Error('Invalid data type. Please provide "low", "high", or "last".');
    }
}