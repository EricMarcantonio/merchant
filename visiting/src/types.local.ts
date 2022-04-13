import express from "express";

export interface ISetShoppingCart {
    item: number,
    val: number,
}


export interface CustomRequest<T> extends express.Request {
    body: T
}