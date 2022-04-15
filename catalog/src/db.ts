import { ItemModel } from "./util";


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