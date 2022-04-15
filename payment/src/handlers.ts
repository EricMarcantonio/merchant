import {Request, Response} from 'express';


export const HandleProcessPayment = (req: Request, res: Response) => {
    if (Math.random() < 0.33) {
        res.sendStatus(500)
    } else {
        res.sendStatus(200)
    }
}
