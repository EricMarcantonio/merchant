import { Response } from "express";

import { RESPONSES } from "./util/responses";
import { Review } from "./db";
import { CustomRequest, IReview } from "./types";
import { MUser } from "./util";

export const HandleGetReviewsByItemId = (req: CustomRequest<IReview>, res: Response) => {
	Review.getById(parseInt(req.params.itemId)).then((items) => {
		res.json(items);
	}).catch(() => {
		RESPONSES.SendNotFound(req, res);
	});
};

export const HandleCreateReview = (req: CustomRequest<IReview>, res: Response) => {
	const user: MUser | undefined = req.user as MUser;
	if (user) {
		Review.create({
			userId: user.id,
			itemId: req.body.itemId,
			rating: req.body.rating,
			data: req.body.data,
		}).then((review) => {
			res.json(review);
		}).catch(() => {
			RESPONSES.SendError(req, res);
		});
	} else {
		RESPONSES.SendError(req, res);
	}

};