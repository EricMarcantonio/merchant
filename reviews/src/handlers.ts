import {Request, Response} from 'express';

import {RESPONSES} from './util/responses';
import {Review} from "./db";
import {CustomRequest, IReview} from "./types";

export const HandleGetReviewsByItemId = (req: CustomRequest<IReview>, res: Response) => {
    Review.getById(req.body.userId).then((items) => {
        res.json(items)
    }).catch(() => {
        RESPONSES.SendNotFound(req, res)
    })
}

export const HandleCreateReview = (req: CustomRequest<IReview>, res: Response) => {
    Review.create(req.body).then((review) => {
        res.json(review)
    }).catch(() => {
        RESPONSES.SendError(req, res)
    })
}