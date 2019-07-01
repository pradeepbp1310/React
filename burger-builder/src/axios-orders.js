import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://the-burger-project-d0e38.firebaseio.com/'
})

export default instance;

