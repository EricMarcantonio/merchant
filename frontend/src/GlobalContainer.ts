import { useState } from "react";
import { createContainer } from "unstated-next";
import { ICart } from "./types";
import { tempCart } from "./backend";
import { UserAttributes } from "./backend/types";

interface IAddressForm {
	firstname: string;
	lastname: string;
	street: string;
	province: string;
	country: string;
	zip: string;
	phone: string;
}

interface IPaymentForm {
	cardNumber: string;
	expiration: string;
	cvv: string;
}

export const container = createContainer(() => {
	const [cart, setCart] = useState<ICart>(tempCart);
	const [count, setCount] = useState([0, 0, 0]);
	let [numItem, setNumItem] = useState(0);
	const [address, setAddress] = useState({} as IAddressForm);
	const [payment, setPayment] = useState({} as IPaymentForm);
	const [user, setUser] = useState({} as UserAttributes);

	const addBag = () => {
		setNumItem((numItem = numItem + 1));
		console.log(numItem);
	};

	return {
		cart,
		setCart,
		count,
		setCount,
		numItem,
		setNumItem,
		addBag,
		user,
		setUser,
		address,
		setAddress,
		payment,
		setPayment,
	};
});
