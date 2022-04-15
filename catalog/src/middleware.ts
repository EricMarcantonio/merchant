import {NextFunction, Request, Response} from 'express'
import {RESPONSES} from './util/responses'

export const MiddleGetItemById = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id && !isNaN(+req.params.id)) {
        next()
    } else {
        RESPONSES.SendBadRequest(req, res, new Error("Not a number"))
    }
};