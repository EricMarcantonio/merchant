import {Response, Request} from "express";
import {Password, User} from "./db";
import {MUser} from "./util"
import {CustomRequest, ILogin, IRegister} from "./types.local";
import jwt from 'jsonwebtoken'
import {jwtOptions} from "./util/passport";
import {RESPONSES, ERRORS} from "./util/responses";
import {PasswordInput, UserInput} from "./util/types";

const EXPIRY_TIME: number = 60 * 60 * 24 * 1000
const TOKEN_NAME: string = "auth-token"

export const HandleCreateUser = async (req: CustomRequest<IRegister>, res: Response) => {
    User.create(req.body.user as UserInput, req.body.password as PasswordInput).then((user) => {
        let payload = {id: user.id};
        let token = jwt.sign(payload, jwtOptions.secretOrKey as string, {expiresIn: EXPIRY_TIME});
        res.cookie(TOKEN_NAME, token, {httpOnly: true})
        RESPONSES.SendOK(req, res, user);
    }).catch((error: Error) => {
        console.log(error)
        RESPONSES.SendBadRequest(req, res, error)
    })
}

export const HandleLogout = async (req: Request, res: Response) => {
    res.clearCookie(TOKEN_NAME)
    RESPONSES.SendOK(req, res);
}


export const HandleVerify = async (req: CustomRequest<{ id: string }>, res: Response) => {
    const user: MUser | undefined = await req.user as MUser
    if (user) {
        RESPONSES.SendOK(req, res, user);
    }
}

export const HandleLogin = async (req: CustomRequest<ILogin>, res: Response) => {
    if (req.body.email) {
        await User.getByEmail(req.body.email).then(async (user) => {
            await LoginHelper(req, res, user)
        }).catch((error: Error) => {
            RESPONSES.SendBadRequest(req, res, error)
        })
    } else if (req.body.username) {
        await User.getByUsername(req.body.username).then(async (user) => {
            await LoginHelper(req, res, user)
        }).catch((error: Error) => {
            RESPONSES.SendBadRequest(req, res, error)
        })
    } else {
        RESPONSES.SendBadRequest(req, res, new Error(ERRORS.USERNAME_OR_EMAIL.toString()))
    }
}

const LoginHelper = async (req: CustomRequest<ILogin>, res: Response, user?: MUser) => {
    if (user) {
        await Password.validate(user, {password: req.body.password} as PasswordInput).then((is_valid) => {
            if (is_valid) {
                let payload = {id: user.id};
                let token = jwt.sign(payload, jwtOptions.secretOrKey as string, {expiresIn: EXPIRY_TIME});
                res.cookie(TOKEN_NAME, token, {httpOnly: true})
                RESPONSES.SendOK(req, res, user);
            } else {
                RESPONSES.SendBadRequest(req, res, new Error(ERRORS.PASSWORD_INVALID.toString()))
            }
        }).catch((error: Error) => {
            RESPONSES.SendBadRequest(req, res, error)
        })
    } else {
        RESPONSES.SendBadRequest(req, res, new Error(ERRORS.NO_USER.toString()))
    }
}
