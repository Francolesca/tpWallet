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
/*         .then(res =>{
            console.log(res);
            return res;
        })
        .catch(function (error) {
            console.log(error);
            }); */
        }
}
