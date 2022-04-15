export interface UserAttributes {
    id: number
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    username: string,
    email: string,
    fname: string,
    lname: string,
}

import axios from "axios";

export const a = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    withCredentials: true,
});
