import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'


export const authenticate = async (userName) => {
    try {
        return await axios.post('/api/auth/authenticate', { userName });
    } catch (error) {
        return { error: 'User does not exist!'};
    }
}