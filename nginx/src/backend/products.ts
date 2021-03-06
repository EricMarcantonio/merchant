import { ICart, ICartUpdate, IOrderData, IProduct } from "../types";
import { a, UserAttributes } from "./types";
import { IReview } from "../components/ProductList";


export const GetAllProductsFromBackend = () => {

	return a.request<IProduct[]>({
		method: "get",
		url: "/catalog/all/",
	})
		.then((response) => {
			return response.data;

		});
};

export const GetAProductByIdFromBackend = (id: number) => {

	return a.request<IProduct>({
		method: "get",
		url: `/catalog/${id}/`,
	})
		.then((response) => {
			return response.data;
		});
};


export const tempCart: ICart = {};


export const GetShoppingCart = () => {
	return a
		.request<IOrderData[]>({
			method: "get",
			url: "/cart/v1/",
			withCredentials: true,
		})
		.then((result) => {

			let cartArray: Promise<IProduct>[] = [];
			if (!result) {
				console.log("There was an error getting the products");
			} else {
				for (let eachItem of result.data) {
					cartArray.push(GetAProductByIdFromBackend(eachItem.itemId));
				}
			}
			if (cartArray.length > 0) {
				return Promise.all<IProduct>(cartArray).then((data) => {
					let temp = {} as ICart;
					for (let eachItem of data) {
						if (eachItem.id) {
							if (temp[eachItem.id?.toString()]) {
								temp[eachItem.id?.toString()].product = eachItem;
							} else {
								temp[eachItem.id?.toString()] = {
									product: eachItem,
									units_requested: result.data.filter(
										(orderItem) => orderItem.itemId == eachItem.id,
									)[0].units,
								};
							}
						}
					}
					return temp;
				});
			}
		});
};

export const UpdateShoppingCart = (cart: ICartUpdate[]) => {
	var data = JSON.stringify(cart);
	return a.request({
		method: "post",
		url: "/cart/v1/",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	})
		.then(function() {
			return GetShoppingCart().then((cart) => {
				return cart;
			});
		});
};


export const AdminLogin = (email: string, password: string) => {
	var data = JSON.stringify({
		email: email,
		password: password,
	});

	return a.request({
		method: "post",
		url: "/auth/v1/login/",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	})
		.then(() => {
			console.log("logged in");
			return true;
		});
};

export const UserRegister = (firstname: string, lastname: string, email: string, username: string, password: string, isAdmin: boolean) => {
	var data = JSON.stringify({
		user: {
			username: username,
			email: email,
			fname: firstname,
			lname: lastname,
			type: isAdmin ? "1": "0"
		},
		password: {
			password: password,
		},
	});

	return a
		.request<UserAttributes>({
			method: "post",
			url: "/auth/v1/register/",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		})
		.then((data) => {
			console.log("registered user");
			return data.data;
		});
};

export const DeleteItemFromCart = (id: number) => {
	var data = JSON.stringify([
		id,
	]);

	return a.request({
		method: "delete",
		url: "/cart/v1/",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	})
		.then(function(response) {
			return true;
		})
		.catch(function(error) {
			console.log(error);
			return false;
		});

};

export const verify = () => {

	a.request({
		method: "post",
		url: "/auth/v1/verify/",
		withCredentials: true,
	})
		.then(function(response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function(error) {
			console.log(error);
		});
};

export const GetReviewsByItemId = (id: number) => {

	return a.request<IReview[]>({
		method: "get",
		url: `/reviews/${id}/`,
	})
		.then((response) => {
			return response.data;
		});
};

export const SendVisitEvent = (id: string | undefined) => {
	let data = JSON.stringify({
		"itemId": id,
		"eventType": "VISIT"
	});
	return a.request({
			method: 'post',
			url: '/visiting/v1/event/',
			headers: {
				'Content-Type': 'application/json'
			},
			data : data,
		withCredentials: true
	})
};