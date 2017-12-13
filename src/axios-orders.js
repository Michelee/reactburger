import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-3b1f8.firebaseio.com/'
});

export default instance;