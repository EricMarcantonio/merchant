import {db, ItemModel, MVisitingEvent, OrderDataModel, VisitEventModel} from "./util";
import { VisitingEventInput } from "./util/types";
import { ERRORS } from "./util/responses";
import {Op} from "sequelize";

const net = require("net");

export const Item = {
	get: () => {
		return ItemModel.findAll();
	},
	getById: (id: number) => {
		return ItemModel.findOne({
			where: {
				id,
			},
		});
	},
};
export const VisitingService = {
	getAllEvents: async () => {
		let date = new Date();
		return await VisitEventModel.findAll({
			where: db.where(db.fn("date", db.col("createdAt")), ">", new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000))),
		}) as Array<MVisitingEvent>;
	},
	getAllOrders: async () => {
		const res = await db.query("SELECT OrderData.itemId, OrderData.units as OrderUnits, OrderData.createdAt, OrderData.updatedAt, OrderData.orderId, Items.id, Items.name, Items.price, Items.isActive, Items.description, Items.type, Items.brand, Items.pictureUrl FROM OrderData Join Items ON OrderData.itemId = Items.id WHERE OrderData.deletedAt is null");
		return res[0];
	},
	Set: async (visiting_event: VisitingEventInput) => {
		if (!net.isIPv4(visiting_event.ipAddress))
			throw new Error(ERRORS.INVALID_IP.toString());
		return await Item.getById(visiting_event.itemId).then(async () => {
			return await VisitEventModel.create(visiting_event) as MVisitingEvent;
		}) as MVisitingEvent;
	},
};