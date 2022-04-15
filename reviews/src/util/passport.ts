import passport from 'passport'
import passportJWT, {JwtFromRequestFunction, StrategyOptions} from 'passport-jwt'
import {MUser} from "./types";
import {UserModel} from './models'


const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const CookieExtractor: JwtFromRequestFunction = (req => {
    let token = null;
    if (req && req.cookies && req.cookies['auth-token']) token = req.cookies['auth-token'];
    return token;
});

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJWT.fromExtractors([CookieExtractor]),
    secretOrKey: `Ho5tIaFZRQEULisJZjlywA==`,
    ignoreExpiration: false,
};


let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    UserModel.findOne({where: {id: jwt_payload.id} as any}).then((u) => {
        const user: MUser | undefined = u as MUser;
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })
});

passport.use(strategy);

export {passport, jwtOptions}