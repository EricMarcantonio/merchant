import { Request, Response } from "express";
import { CustomRequest } from "./types.local";
import { MUser, VisitingEventInput } from "./util/types";
import { RESPONSES } from "./util/responses";
import { VisitingService } from "./db";

export const GetEvents = async (req: Request, res: Response) => {
	const user: MUser | undefined = await req.user as MUser;
	if (user && user.type == 1) {
		VisitingService.getAllEvents().then((ve) => {
			RESPONSES.SendOK(req, res, ve);
		}).catch((e) => {
			RESPONSES.SendBadRequest(req, res, e);
		});
	} else {
		RESPONSES.SendUnauthorized(req, res);
	}
};

export const GetOrders = async (req: Request, res: Response) => {
	const user: MUser | undefined = await req.user as MUser;
	if (user && user.type == 1) {
		VisitingService.getAllOrders().then((ve) => {
			RESPONSES.SendOK(req, res, ve);
		}).catch((e) => {
			console.log(e)
			RESPONSES.SendBadRequest(req, res, e);
		});
	} else {
		RESPONSES.SendUnauthorized(req, res);
	}
};

export const SetEvent = async (req: CustomRequest<VisitingEventInput>, res: Response) => {
	const user: MUser | undefined = await req.user as MUser;
	if (typeof req.headers["x-forwarded-for"] == "string") {
		try {
			req.body.ipAddress = req.headers["x-forwarded-for"].split(", ")[0];
		} catch (e) {
			req.body.ipAddress = undefined
		}
	} else {
		req.body.ipAddress = undefined
	}
	if (user) {
		VisitingService.Set(req.body as VisitingEventInput).then((ve) => {
			RESPONSES.SendOK(req, res, ve);
		}).catch((e) => {
			RESPONSES.SendBadRequest(req, res, e);
		});
	} else {
		RESPONSES.SendUnauthorized(req, res);
	}
};