import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://todo-liste-db94c-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance