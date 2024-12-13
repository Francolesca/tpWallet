import axios from 'axios';

const apiClient = axios.create({
    baseURL:'https://labor3-d60e.restdb.io/rest/',
    withCredentials: false,
    headers: {
        'x-apikey':'64a2e9bc86d8c525a3ed8f63'
    }
})

export default{
    postTransaction(data){
        apiClient.post('/transactions', data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
          });
        },
    getTransaction(userId){
        return apiClient.get('transactions?q={"user_id": "'+ userId+'"}')
        },
    patchTransaction(id, data){
        apiClient.patch('transactions/'+id, data);
    },
    delTransaction(id){
        apiClient.delete('transactions/'+id);
        
    }
}
