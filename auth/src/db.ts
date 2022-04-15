import {db, MPassword, MUser, PasswordModel, UserModel} from "./util";
import {PasswordInput, UserInput} from "./util/types";
import {ERRORS} from "./util/responses";

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
        const t = await db.transaction()
        user_input.type = undefined
        return await UserModel.create(user_input, {transaction: t}).then(async (u) => {
            const user = u as MUser
            if (!validatePassword(password.password)) {
                await t.rollback()
                throw new Error(ERRORS.INVALID_PASSWORD_STRENGTH.toString())
                return user as MUser
            } else {
                password.password = hash(password.password)
                password.userId = user.id
                return await PasswordModel.create(password, {transaction: t}).then(async () => {
                    await t.commit()
                    return user as MUser;
                })
            }
        })
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
        const p = await PasswordModel.findOne({where: {userId: user.id}}) as MPassword
        return p.password === hash(password.password);
    }
}

const validatePassword = (password: string) => {
    return new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(password)
}

const hash = (password: string): string => {
    const salt = "094y7o9qno22=="
    return crypto.createHash('sha256', salt).update(password).digest('hex');
}