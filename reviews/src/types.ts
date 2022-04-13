import {Request} from "express";

export interface CustomRequest<T> extends Request {
    body: T
}

export interface IReview {
    userId: number,
    itemId: number,
    data: string,
    rating: number
}