import {db, MUser, ShoppingCartModel} from "./util";
import {ShoppingCartInput, MShoppingCart} from "./util/types";
import {Op} from "sequelize";

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
                        { userId: user.id},
                        { itemId: { [Op.or]: cart.map(item => item.itemId)}}
                    ]
                }
            }).then(async () => {
                return ShoppingCartModel.bulkCreate(cart.map((sc) => {
                    return {
                        ...sc,
                        userId: user.id
                    }
                }))
            })
            await t.commit()
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
}