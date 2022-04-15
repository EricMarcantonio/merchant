import {Request, Response} from 'express';
import {Item} from './db';
import {RESPONSES} from './util/responses';

export const HandleGetAllItems = (req: Request, res: Response) => {
    Item.get().then((items) => {
        res.json(items)
    }).catch(() => {
        RESPONSES.SendNotFound(req, res)
    })
};

export const HandleGetItemById = (req: Request, res: Response) => {
    Item.getById(+req.params.id).then((item) => {
        res.json(item)
    }).catch((err) => {
        RESPONSES.SendNotFound(req, res)
    })
};