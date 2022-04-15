export interface IProduct {
	id?: number;
	name?: string;
	price?: number;
	description?: string;
	isActive?: number,
	units?: number,
	type?: string,
	brand?: string,
	pictureUrl?: string,
	createdAt?: string,
	updatedAt?: string,
	deletedAt?: string
}

export interface ICart {
	[id: number]: {
		product: IProduct;
		units_requested: number;
	};
}

export interface ICartUpdate {
	itemId: number;
	units: number;
}

export interface IOrderItem {
	order: {
		userId: number;
		id: number;
		itemId: number;
		units: number;
		updatedAt: string;
		createdAt: string;
		deletedAt: string;
		status?: string;
	};
	orderData: IOrderData[];
}

export interface IOrderData {
	id: number,
	orderId: number,
	itemId: number,
	units: number,
	updatedAt: string;
	createdAt: string;
	deletedAt: string;
	status?: string;
}