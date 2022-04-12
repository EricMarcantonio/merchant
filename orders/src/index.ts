import express from 'express'

import {connectToDb, passport} from "./util";

import cookieParser from 'cookie-parser'
import {MiddleOrder} from "./middleware";
import {HandleCreateOrder, HandleGetAllOrders} from "./handlers";
import cors, {CorsOptions} from 'cors'

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN, credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "OPTIONS"]
} as CorsOptions
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())
app.use(passport.initialize())

app.use((req, res, next) => {
    console.log(req.headers, req.method, req.cookies, req.url)
    next()
})

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.post("/create", [passport.authenticate("jwt", {session: false}), MiddleOrder], HandleCreateOrder)
app.get("/all", [passport.authenticate("jwt", {session: false})], HandleGetAllOrders)


connectToDb().then(() => {
    const port = parseInt(process.env.EXPRESS_PORT || "0")
    app.listen(port, () => {
        console.log(`Orders2 is on ${port}`)
    })
}).catch((err) => {
    console.error(err)
})
