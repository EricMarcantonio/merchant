import axios from 'axios';
import { UserAttributes } from './types';

export const VerifyUser = () => {
    let data = '';
    return axios.request<UserAttributes>({
        method: 'post',
        url: 'http://127.0.0.1/auth/verify/',
        headers: { },
        data : data,
        withCredentials: true
      })
    .then((response) => {
        return response.data;
    })
} 