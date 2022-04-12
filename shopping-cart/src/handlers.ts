import {Request, Response} from "express";
import { ShoppingCart } from "./db";
import { MUser } from "./util"
import { CustomRequest } from "./types.local";
import { RESPONSES } from "./util/responses";
import { ShoppingCartInput } from "./util/types";


export const GetCart = async (req: Request, res: Response) => {
    const user: MUser | undefined = await req.user as MUser
    if (user) {
        ShoppingCart.getAll(user).then((cart) => {
            RESPONSES.SendOK(req, res, cart);
        }).catch((error: Error) => {
            RESPONSES.SendBadRequest(req, res, error)
        })
    } else {
        RESPONSES.SendUnauthorized(req, res);
    }
}

export const SetCart = async (req: CustomRequest<Array<ShoppingCartInput>>, res: Response) => {
    const user: MUser | undefined = await req.user as MUser
    console.log(req.body);
    if (user) {
        ShoppingCart.setAll(user, req.body).then((cart) => {
            RESPONSES.SendOK(req, res, cart);
        }).catch((error: Error) => {
            RESPONSES.SendBadRequest(req, res, error)
        })
    } else {
        RESPONSES.SendUnauthorized(req, res);
    }
}

export const RemoveCart = async (req: CustomRequest<Array<number>>, res: Response) => {
    const user: MUser | undefined = await req.user as MUser
    if (user) {
        ShoppingCart.removeAll(user, req.body).then((num_removed) => {
            RESPONSES.SendOK(req, res, {removed: num_removed});
        }).catch((error: Error) => {
            RESPONSES.SendBadRequest(req, res, error)
        })
    } else {
        RESPONSES.SendUnauthorized(req, res);
    }
}
