import {Sequelize} from "sequelize";


const checkEnv = process.env.DB && process.env.USER && process.env.PASSWORD && process.env.HOST && process.env.PORT && process.env.EXPRESS_PORT && process.env.CORS_ORIGIN;

const db = new Sequelize(
    process.env.DB || "",
    process.env.USER || "",
    process.env.PASSWORD || "",
    {
        host: process.env.HOST || "",
        dialect: 'mariadb',
        port: (process.env.PORT && parseInt(process.env.PORT)) || 0,
        timezone: 'utc'
    });

/**
 * Call this function to connect to the util and create the tables
 */
export const connectToDb = () => {
    if (checkEnv){
        return db.authenticate()
    } else {
        throw new Error("Cannot connect to DB")
    }
}


export {
    CreditCardModel,
    AddressModel,
    OrderModel,
    UserModel,
    OrderDataModel,
    ItemModel,
    ShoppingCartModel,
    VisitEventModel,
    PasswordModel
} from './models'

export {passport} from './passport'
export {db}

export {
    MUser, MItem, MCreditCard, MOrder, MOrderData, MPassword, MShoppingCart, MVisitingEvent, MAddress
} from './types'
