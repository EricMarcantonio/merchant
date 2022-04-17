import axios from "axios";

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


export const a = axios.create({
	baseURL: process.env.REACT_APP_DEV ? process.env.REACT_APP_BACKEND : "http://" + window.location.host + "/api",
});
