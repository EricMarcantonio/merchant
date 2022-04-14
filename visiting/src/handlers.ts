import {Request, Response} from "express";
import {CustomRequest} from "./types.local";
import {MUser, VisitingEventInput} from "./util/types";
import { RESPONSES } from "./util/responses";
import {VisitingService} from "./db";

export const GetEvents = async (req: Request, res: Response) => {
    const user: MUser | undefined = await req.user as MUser
    if (user && user.type == 1) {
        VisitingService.getAll().then((ve) => {
            RESPONSES.SendOK(req, res, ve)
        }).catch((e) => {
            RESPONSES.SendBadRequest(req, res, e)
        })
    } else {
        RESPONSES.SendUnauthorized(req, res)
    }
}

export const SetEvent = async (req: CustomRequest<VisitingEventInput>, res: Response) => {
    const user: MUser | undefined = await req.user as MUser
    if(typeof req.headers['x-forwarded-for'] == "string") {
        console.log(req.headers['x-forwarded-for'].split(", ")[0])
        req.body.ipAddress = req.headers['x-forwarded-for'].split(", ")[0]
    }
    if (user) {
        VisitingService.Set(req.body as VisitingEventInput).then((ve) => {
            RESPONSES.SendOK(req, res, ve)
        }).catch((e) => {
            RESPONSES.SendBadRequest(req, res, e)
        })
    } else {
        RESPONSES.SendUnauthorized(req, res)
    }
}