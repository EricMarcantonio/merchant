import {db, ItemModel, MItem, MUser, ShoppingCartModel} from "./util";
import {MShoppingCart, ShoppingCartInput} from "./util/types";
import {ERRORS, ItemUnitError} from './util/responses'
import {Op} from "sequelize";

export const Item = {
    get: async (cart: Array<ShoppingCartInput>) => {
        return await ItemModel.findAll({
            where: {
                [Op.or]: cart.map(item => [{
                    [Op.and]: [
                        {id: item.itemId}, {units: {[Op.lt]: item.units}}
                    ]
                }]),
            }
        }) as Array<MItem>
    },
    getById: (id: number) => {
        return ItemModel.findOne({
            where: {
                id
            }
        })
    }
};

export const ShoppingCart = {
    getAll: async (user: MUser) => {
        return await ShoppingCartModel.findAll({
            where: {
                userId: user.id
            }
        }) as Array<MShoppingCart>
    },
    setAll: async (user: MUser, cart: Array<ShoppingCartInput>) => {
        return await db.transaction().then(async (t) => {
            const carts = await ShoppingCartModel.destroy({
                where: {
                    [Op.and]: [
                        {userId: user.id},
                        {itemId: {[Op.or]: cart.map(item => item.itemId)}}
                    ]
                }
            }).then(async () => {
                return await Item.get(cart).then((items) => {
                    if (items.length != 0)
                        throw new ItemUnitError(ERRORS.INVALID_UNITS.toString(), items, cart);
                    return ShoppingCartModel.bulkCreate(cart.map((sc) => {
                        return {
                            ...sc,
                            userId: user.id
                        }
                    }))
                })
            });
            await t.commit();
            return carts;
        }) as Array<MShoppingCart>
    },
    removeAll: async (user: MUser, cart: Array<number>) => {
        return await ShoppingCartModel.destroy({
            where: {
                [Op.and]: [
                    {userId: user.id},
                    {itemId: {[Op.or]: cart}}
                ]
            }
        }) as number
    },
};