import {Model, Optional} from "sequelize";

// Interfaces
interface AddressAttributes {
    id: number,
    updatedAt?: Date,
    createdAt?: Date,
    deletedAt?: Date,
    street: string,
    province: string,
    country: string,
    zip: string,
    phone: string,
}

interface CreditCardAttributes {
    id: number,
    updatedAt?: Date,
    createdAt?: Date,
    deletedAt?: Date,
    number: string,
    userId: number,
}

interface UserAttributes  {
    id: number
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    username: string,
    email: string,
    fname: string,
    lname: string,
}

interface ItemAttributes {
    id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    name: string,
    price: number,
    isActive: string,
    units: string,
    description: string,
    type: string,
    brand: string,
    pictureUrl: string,
}

interface OrderAttributes {
    id: number,
    deletedAt?: Date
    modifiedAt?: Date,
    createdAt?: Date,
    addressId: number,
    fname: string,
    lname: string,
    creditCardId: number,
    status?: string,
    userId: number,
}

interface OrderDataAttributes {
    id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    orderId: number,
    itemId: number,
    units: number,
}

interface PasswordAttributes {
    userId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    password: string
}

interface ShoppingCartAttributes {
    id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    userId: number,
    itemId: number,
    units: number,
}

interface VisitEventAttributes {
    id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    time: string,
    eventType: string,
    ipAddress: string
}

// Classes
export class MAddress extends Model<AddressAttributes, AddressInput> implements AddressAttributes {
    public id!: number
    public updatedAt!: Date
    public createdAt!: Date
    public deletedAt!: Date
    public street!: string
    public province!: string
    public country!: string
    public zip!: string
    public phone!: string
}

export class MCreditCard extends Model<CreditCardAttributes, CreditCardInput> implements CreditCardAttributes {
    public id!: number
    public updatedAt!: Date
    public createdAt!: Date
    public deletedAt!: Date
    public number!: string
    public userId!: number
}

export class MUser extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date
    public deletedAt!: Date
    public username!: string
    public email!: string
    public fname!: string
    public lname!: string
}

export class MItem extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date
    public deletedAt!: Date
    public name!: string
    public price!: number
    public isActive!: string
    public units!: string
    public description!: string
    public type!: string
    public brand!: string
    public pictureUrl!: string
}

export class MOrder extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
    public id!: number
    public deletedAt!: Date
    public modifiedAt!: Date
    public createdAt!: Date
    public addressId!: number
    public fname!: string
    public lname!: string
    public creditCardId!: number
    public status!: string
    public userId!: number
}

export class MOrderData extends Model<OrderDataAttributes, OrderDataInput> implements OrderDataAttributes {
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date
    public deletedAt!: Date
    public orderId!: number
    public itemId!: number
    public units!: number
}

export class MPassword extends Model<PasswordAttributes, PasswordInput> implements PasswordAttributes {
    public userId!: number
    public createdAt!: Date
    public updatedAt!: Date
    public deletedAt!: Date
    public password!: string
}

export class MVisitingEvent extends Model<VisitEventAttributes, VisitingEventInput> implements VisitEventAttributes {
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date
    public deletedAt!: Date
    public time!: string
    public eventType!: string
    public ipAddress!: string
}

export class MShoppingCart extends Model<ShoppingCartAttributes, ShoppingCartInput> implements ShoppingCartAttributes {
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date
    public deletedAt!: Date
    public userId!: number
    public itemId!: number
    public units!: number
}

// Input Output Interfaces
export interface AddressInput extends Optional<AddressAttributes, 'id'> {}
export interface AddressOutput extends Required<AddressAttributes> {}
export interface CreditCardInput extends Optional<CreditCardAttributes, 'id'> {}
export interface CreditCardOutput extends Required<CreditCardAttributes> {}
export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}
export interface ItemInput extends Optional<ItemAttributes, 'id'> {}
export interface ItemOutput extends Required<ItemAttributes> {}
export interface OrderInput extends Optional<OrderAttributes, 'id'> {}
export interface OrderOuput extends Required<OrderAttributes> {}
export interface OrderDataInput extends Optional<OrderDataAttributes, 'id'> {}
export interface OrderDataOuput extends Required<OrderDataAttributes> {}
export interface PasswordInput extends Optional<PasswordAttributes, 'userId'> {}
export interface PasswordOutput extends Required<PasswordAttributes> {}
export interface ShoppingCartInput extends Optional<ShoppingCartAttributes, 'id' | 'userId'> {}
export interface ShoppingCartOutput extends Required<ShoppingCartAttributes> {}
export interface VisitingEventInput extends Optional<VisitEventAttributes, 'id'> {}
export interface VisitingEventOutput extends Required<VisitEventAttributes> {}