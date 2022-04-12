import express from "express";
import {PasswordInput, UserInput} from "./util/types";

export interface ILogin {
    username: string,
    email: string,
    password: string
}

export interface IRegister {
    user?: UserInput,
    password?: PasswordInput,
}

export interface CustomRequest<T> extends express.Request {
    body: T
}