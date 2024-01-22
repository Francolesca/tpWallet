import axios from 'axios';

const apiClient = axios.create({
    baseURL:'https://laboratorio3-f36a.restdb.io/rest/',
    withCredentials: false,
    headers: {
        'x-apikey':'60eb09146661365596af552f'
    }
})

export default{
    postTransaction(data){
        apiClient.post('transaction', data)
    },
    
}
