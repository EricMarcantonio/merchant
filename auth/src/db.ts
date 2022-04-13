import {db, MPassword, MUser, PasswordModel, UserModel} from "./util";
import {PasswordInput, UserInput} from "./util/types";

const crypto = require("crypto");

export const User = {
    getOne: async (user: UserInput) => {
        return await UserModel.findOne({
            where: user as any
        }) as MUser
    },
    getByUsername: async (username: string) => {
        return await UserModel.findOne({
            where: {
                username: username
            }
        }) as MUser
    },
    getByEmail: async (email: string) => {
        return await UserModel.findOne({
            where: {
                email: email
            }
        }) as MUser
    },
    create: async (user_input: UserInput, password: PasswordInput) => {
        return await db.transaction().then(async (t) => {
            user_input.type = undefined
            const user = await UserModel.create(user_input).then(async (u) => {
                const user = u as MUser
                password.password = hash(password.password)
                password.userId = user.id
                return await PasswordModel.create(password).then(async () => {
                    return user
                })
            })
            await t.commit();
            return user;
        }) as MUser;
    },
    updateById: async (user: MUser) => {
        return await UserModel.update(user, {
            where: {
                id: user.id
            }
        })
    }
}

export const Password = {
    validate: async (user: UserInput, password: PasswordInput) => {
        const p = await PasswordModel.findOne({where: { userId: user.id }}) as MPassword
        return p.password === hash(password.password);
    }
}


const hash = (password: string):string => {
    const salt = "094y7o9qno22=="
    return crypto.createHash('sha256', salt).update(password).digest('hex');
}