import {NextFunction, Response} from 'express'
import {CustomRequest} from "./types";
import {RESPONSES} from "./util/responses";

export interface IOrderRequestBody {
    address: {
        street: string,
        province: string,
        country: string,
        zip: string,
        phone: string,
    },
    fname: string,
    lname: string,
    creditCard: {
        number: string
    }
}

export const MiddleOrder = (req: CustomRequest<IOrderRequestBody>, res: Response, next: NextFunction) => {
    const body = req.body;
    if (body.address && body.address.zip && body.address.country && body.address.phone && body.address.street
        && body.address.province && body.creditCard.number && body.fname && body.lname){
        next()
    } else {
        RESPONSES.SendBadRequest(req, res, new Error("Incorrect Args"))
    }
}

export const MiddleGetAllOrdersOfUser = (req: CustomRequest<IOrderRequestBody>, res: Response, next: NextFunction) => {

}