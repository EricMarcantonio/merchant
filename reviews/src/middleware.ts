import {Request, Response, NextFunction} from 'express'
import {RESPONSES} from './util/responses'
import {CustomRequest, IReview} from "./types";

export const MiddleGetReviewById = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.itemId && !isNaN(+req.params.itemId)) {
        next()
    } else {
        RESPONSES.SendBadRequest(req, res, new Error("Not a number"))
    }
}

export const MiddleCreateReview = (req: CustomRequest<IReview>, res: Response, next: NextFunction) => {
    if (req.body.userId && !isNaN(+req.body.userId) && req.body.itemId && !isNaN(+req.body.itemId) && req.body.rating && !isNaN(+req.body.rating) && req.body.rating < 6 && req.body.data && req.body.data !== "") {
        next()
    } else {
        RESPONSES.SendBadRequest(req, res, new Error("Not a number"))
    }
}