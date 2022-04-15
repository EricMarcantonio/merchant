import {
	AddressModel,
	CreditCardModel,
	db,
	MAddress,
	MCreditCard,
	MOrder,
	MOrderData,
	MUser,
	OrderDataModel,
	OrderModel,
	UserModel,
} from "./util";
import { AddressInput, CreditCardInput, OrderInput, UserInput } from "./util/types";


export const User = {
	getOne: async (user: UserInput) => {
		try {
			return await UserModel.findOne({
				where: user as any,
			}) as MUser;
		} catch (err) {
			return {} as MUser;
		}

	},
	create: async (user: UserInput) => {
		try {
			return await UserModel.create(user) as MUser;
		} catch (err) {
			return {} as MUser;
		}
	},
	updateById: async (user: UserInput) => {
		return await UserModel.update(user, {
			where: {
				id: user.id,
			},
		});
	},
};

export const Order = {
	get: async (order: MOrder) => {
		try {
			return await OrderModel.findOne({
				where: order as any,
			}) as MOrder;
		} catch (err) {
			console.error(err);
			return {} as MOrder;
		}
	},
	create: async (order: OrderInput) => {
		try {
			return await OrderModel.create(order) as MOrder;
		} catch (err) {
			console.error(err);
			return {} as MOrder;
		}
	},
	createWithPro: async (order: OrderInput) => {
		try {
			await db.query("LOCK TABLES Orders write, OrderData write, ShoppingCarts write, Items write");
			const results = await db.query(
				"CALL CREATE_ORDER(?, ?, ?, ?, ?)",
				{
					replacements: [order.userId, order.addressId, order.fname, order.lname, order.creditCardId],
					mapToModel: true,
					model: OrderModel,
				},
			);
			await db.query("unlock tables");
			return results[0] as MOrder;
		} catch (err) {
			console.error(err);
			return {} as MOrder;
		}
	},
};

export const Address = {
	get: async (address: MAddress) => {
		try {
			return await AddressModel.findOne({
				where: address as any,
			}) as MAddress;
		} catch (err) {
			console.error(err);
			return {} as MAddress;
		}
	},
	create: async (address: AddressInput) => {
		try {
			return await AddressModel.create(address) as MAddress;
		} catch (err) {
			console.error(err);
			return {} as MAddress;
		}

	},
};

export const OrderData = {
	get: async (orderData: MOrderData) => {
		try {
			return await OrderDataModel.findAll({
				where: orderData as any,
			}) as MOrderData[];
		} catch (err) {
			console.error(err);
			return {} as MOrderData;
		}
	},
};

export const CreditCard = {
	get: async (creditCard: MCreditCard) => {
		try {
			return await CreditCardModel.findOne({
				where: creditCard as any,
			}) as MCreditCard;
		} catch (err) {
			console.error(err);
			return {} as MCreditCard;
		}

	},
	create: async (creditCard: CreditCardInput) => {
		try {
			return await CreditCardModel.create(creditCard) as MCreditCard;
		} catch (err) {
			console.error(err);
			return {} as MCreditCard;
		}
	},
};

