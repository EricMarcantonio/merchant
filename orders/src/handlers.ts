import { MAddress, MCreditCard, MUser, OrderDataModel, OrderModel } from "./util";
import { Response } from "express";
import { Address, CreditCard, Order } from "./db";
import { CustomRequest } from "./types";
import { IOrderRequestBody } from "./middleware";
import { RESPONSES } from "./util/responses";
import { Model } from "sequelize";
import { OrderInput } from "./util/types";

export const HandleCreateOrder = async (req: CustomRequest<IOrderRequestBody>, res: Response) => {
	const address = req.body.address;
	const creditCard = req.body.creditCard;

	try {
		const user: MUser | undefined = req.user as MUser;
		const addr = await Address.create(address as MAddress);
		const cc = await CreditCard.create(creditCard as MCreditCard);
		const order = {
			fname: req.body.fname,
			lname: req.body.lname,
			userId: user.id,
			addressId: addr.id,
			creditCardId: cc.id,
		} as OrderInput;
		const ans = await Order.createWithPro(order);
		// @ts-ignore
		if (ans[0] && ans[0].id) {
			const orderData = await OrderDataModel.findAll({
				where: {
					// @ts-ignore
					orderId: ans[0].id,
				},
			});
			res.json({
				// @ts-ignore
				order: ans[0],
				orderData,
			});
		} else {
			RESPONSES.SendBadRequest(req, res, new Error("Couldn't create order"));
		}
	} catch (err: any) {
		console.error("error", err);
		RESPONSES.SendBadRequest(req, res, err);
	}
};

interface OrderResponse {
	[key: string]: {
		order: any,
		orderData: Model<any, any>[]
	};
}


export const HandleGetAllOrders = async (req: CustomRequest<IOrderRequestBody>, res: Response) => {
	const user: MUser | undefined = req.user as MUser;
	if (user) {
		OrderModel.findAll({
			where: {
				userId: user.id,
			},
		}).then(async (orders) => {
			let orderResponse = {} as OrderResponse;

			let orderDataArray = orders.map((order) => OrderDataModel.findAll({
				where: {
					orderId: order.getDataValue("id"),
				},
			}));

			await Promise.all(orderDataArray).then((data) => {
				data.forEach((orderData) => {
					orderResponse[orderData[0].getDataValue("orderId")] = {
						order: orders.filter((order) => order.getDataValue("id") === orderData[0].getDataValue("orderId")),
						orderData,
					};
				});
			});
			res.json(orderResponse);
		});
	} else {
		RESPONSES.SendNotFound(req, res);
	}
};
