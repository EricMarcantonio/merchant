import { IOrderItem } from "../types";
import { a } from "./types";

interface IGetOrders {
	[key: string]: IOrderItem;
}


export const GetAllOrders = () => {
	return a.request<IGetOrders>({
		method: "get", url: "/orders/all/", withCredentials: true,
	})
		.then((response) => {
			console.log(response.data);

			return Object.keys(response.data).map((id) => response.data[id]);
		});
};


export interface IAddress {
	street: string,
	province: string,
	country: string,
	phone: string,
	zip: string
}

export interface ICreditCard {
	number: string
}
export const CreateOrder = (address: IAddress, fname: string, lname: string, creditCard: ICreditCard) => {
	let data = JSON.stringify({
		"address": address,
		"fname": fname,
		"lname": lname,
		"creditCard": creditCard
	});
	return a.request({
		method: "post",
		url: "/orders/create/",
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json'
		},
		data: data,
	}).then((data) => {
		return data.data;
	})
};

export const GetAnalytics = () => {
	return a.request({
		method: "GET",
		url: "/visiting/v1/event/",
		withCredentials: true
	}).then((data) => {
		return data.data;
	})
};

export const GetOrder = () => {
		return a.request({
			method: "GET",
			url: "/visiting/v1/orders/",
			withCredentials: true
		}).then((data) => {
			return data.data;
		})
};