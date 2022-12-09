import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5295/api/v01/';

interface Props{
    url:string;
    method: "put" | "get" | "post" | "delete";
    body?: string | null;
    headers?: string | null;
}

const useAxios = ({ url, method, body = null, headers = null } : Props) => {

    const fetchData = async() => {
        return (await axios[method](url, headers ? JSON.parse(headers) : null, body ? JSON.parse(body) : null)).data

    };

    return fetchData;
};

export default useAxios;