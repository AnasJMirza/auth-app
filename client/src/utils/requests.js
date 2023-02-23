import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'


export const authenticate = async (userName) => {
    try {
        return await axios.post('/api/auth/authenticate', { userName });
    } catch (error) {
        return { error: 'User does not exist!'};
    }
}


export const getUser = async (userName) => {
    try {
        return await axios.get(`/api/user/getuser/${userName}`)
    } catch (error) {
        return { error: 'Can"t fetch user!'};
    }
}


export const verifyPassword = async (userName, password) => {
    try {
        if(userName){
            const response = await axios.post('/api/auth/login', {userName, password});
            return response;
        }
        
    } catch (error) {
        console.log('error in varify password');
        return { error: 'password not matched!'}
    }
}


export const registerUser = async (credentials) => {
    try {
        const response = await axios.post('/api/user/register', credentials);
        if(status === 200) {
            return response;
        }
    } catch (error) {
        return { error: 'Somethin went wrong'};
    }
}