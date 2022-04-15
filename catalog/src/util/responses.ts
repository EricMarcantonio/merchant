import {Request, Response} from "express";
import {ForeignKeyConstraintError, ValidationError} from "sequelize";
import {MItem, ShoppingCartInput} from "./types";

interface IErrors {
    [index: number]: string;
}

interface IContraintErrors {
    [index: string]: number;
}

interface IErrorsBlock {
    [index: number]: string
}

export enum ERRORS {
    STREET_NULL,
    PROVINCE_NULL,
    COUNTRY_NULL,
    ZIP_NULL,
    PHONE_NULL,
    USERNAME_NULL,
    EMAIL_NULL,
    FIRST_NAME_NULL,
    LAST_NAME_NULL,
    CREDIT_CARD_NUMBER_NULL,
    USER_ID_NULL,
    ADDRESS_ID_NULL,
    CREDIT_CARD_ID_NULL,
    ITEM_NAME_NULL,
    PRICE_NULL,
    UNITS_NULL,
    DESCRIPTION_NULL,
    TYPE_NULL,
    BRAND_NULL,
    PASSWORD_INVALID,
    ORDER_UNITS_NULL,
    PASSWORD_IS_NULL,
    IP_ADDRESS_NULL,
    TIME_NULL,
    ITEM_ID_NULL,
    EVENT_TYPE_NULL,
    EMAIL_NOT_UNIQUE,
    ITEM_ID_INVALID,
    USER_ID_INVALID,
    ORDER_ID_INVALID,
    ADDRESS_ID_INVALID,
    NO_USER,
    USERNAME_NOT_UNIQUE,
    USER_ID_NOT_UNIQUE,
    USERNAME_OR_EMAIL,
    INVALID_IP,
    INVALID_UNITS,
    INVALID_PASSWORD_STRENGTH,
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

interface InvalidItems {
    id: number,
    valid_count: number
}

export class ItemUnitError implements Error {
    message: string;
    name: string;
    invalid_items: Array<InvalidItems | undefined>;

    constructor(message: string, items: MItem[], cart: ShoppingCartInput[]) {
        this.message = message;
        this.name = "Item unit error.";
        this.invalid_items = items.map((item) => {
            let c = cart.find(c => c.id == item.id);
            if (!c)
                return {id: item.id, valid_count: item.units}
        })
    }
}

class Responses {
    private ERRORS: IErrors = {
        0: "Street is null.",
        1: "Province is null.",
        2: "Country is null.",
        3: "Zip is null.",
        4: "Phone is null.",
        5: "Username is null.",
        6: "Email is null.",
        7: "First name is null.",
        8: "Last name is null.",
        9: "Credit card number is null.",
        10: "User id is null.",
        11: "Address id is null.",
        12: "Credit card id is null.",
        13: "Item name is null.",
        14: "Price is null.",
        15: "Units is null.",
        16: "Description is null.",
        17: "Type is null.",
        18: "Brand is null.",
        19: "Password is not valid",
        20: "Order units is null.",
        21: "Password is null.",
        22: "IP address is null.",
        23: "Time is null.",
        24: "Item id is null.",
        25: "Event type is null.",
        26: "Email is not unique.",
        27: "Invalid item id.",
        28: "Invalid user id.",
        29: "Invalid order id.",
        30: "Invalid address id.",
        31: "Account does not exist",
        32: "Username not unique.",
        33: "User id not unique.",
        34: "No username or email provided.",
        35: "Invalid IP.",
        36: "Invalid item units.",
        37: "Invalid password strength. Password must be at least 8 characters long, contain 1 upper case, 1 lower case, 1 number, and 1 special character.",
        200: "OK.",
        400: "Bad request.",
        401: "Unauthorized.",
        404: "Not Found.",
        500: "Internal Error."
    };
    private CONSTRAINT_ERRORS: IContraintErrors = {
        "itemId": 27,
        "userId": 28,
        "orderId": 29,
        "addressId": 30
    };

    SendUnauthorized = (req: Request, res: Response, error?: Error) => {
        if (error)
            res.status(401).json(this.buildError(error));
        else
            res.status(401).json(this.buildError(new Error(ERRORS.UNAUTHORIZED.toString())))
    };

    SendBadRequest = (req: Request, res: Response, error?: Error) => {
        if (error)
            res.status(400).json(this.buildError(error));
        else
            res.sendStatus(400)
    };

    SendOK = (req: Request, res: Response, object?: object) => {
        if (object)
            res.status(200).json(object);
        else
            res.sendStatus(200)
    };

    SendError = (req: Request, res: Response) => {
        res.status(500).json(this.buildError(new Error(ERRORS.INTERNAL_ERROR.toString())))
    };

    SendNotFound = (req: Request, res: Response) => {
        res.status(404).json(this.buildError(new Error(ERRORS.NOT_FOUND.toString())))
    };

    private buildError = (error: Error): IErrorsBlock => {
        // Capture Error class, and handle
        if (error instanceof ValidationError) {
            // ValidationError, most common
            let res = {} as IErrorsBlock;
            for (let err of error.errors) {
                let c_parsed = parseInt(err.message);
                res[c_parsed] = this.ERRORS[c_parsed]
            }
            return res
        } else if (error instanceof ForeignKeyConstraintError) {
            // ForeignKeyConstraintError, adding item to cart when item doesn't exist
            let res = {} as IErrorsBlock;
            if (error.fields) {
                for (let err in error.fields) {
                    res[this.CONSTRAINT_ERRORS[error.fields[err]]] = this.ERRORS[this.CONSTRAINT_ERRORS[error.fields[err]]]
                }
                return res
            }
        } else if (error instanceof ItemUnitError) {
            // Not enough items
            let res = {} as IErrorsBlock;
            let sub_res = JSON.stringify(error.invalid_items);
            res[parseInt(error.message)] = sub_res;
            return res
        }
        try {
            let e_parsed: number = parseInt(error.message);
            if (e_parsed) {
                let res: IErrorsBlock = {};
                res[e_parsed] = this.ERRORS[e_parsed];
                return res as IErrorsBlock
            }
            return {
                500: this.ERRORS[ERRORS.INTERNAL_ERROR]
            }
        } catch (e) {
            return {
                500: this.ERRORS[ERRORS.INTERNAL_ERROR]
            }
        }

    }
}

export const RESPONSES = new Responses();