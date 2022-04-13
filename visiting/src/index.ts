import express from 'express'
import cookieParser from 'cookie-parser'
import {passport, connectToDb} from "./util";
import {GetEvents, SetEvent} from "./handlers";
import cors from 'cors'
const app = express();

app.use(cors({
    origin: "http://127.0.0.1:8080",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "OPTIONS", "DELETE"]
}))

app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())

app.use((req, res, next) => {
    console.log(req.headers, req.method, req.cookies, req.url)
    next()
})

app.get("*", passport.authenticate('jwt', { session: false }),  GetEvents)
app.post("*", passport.authenticate('jwt', { session: false }),  SetEvent)


connectToDb().then(() => {
    const port = parseInt(process.env.EXPRESS_PORT || "0")
    app.listen(port, () => {
        console.log(`ShoppingCart is on ${port}`)
    })
}).catch((err) => {
    console.error(err)
})
