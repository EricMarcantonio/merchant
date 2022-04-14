import express from 'express'

import {connectToDb} from "./util";

import {HandleProcessPayment} from './handlers';


const app = express();

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.headers, req.method, req.cookies, req.url)
    next()
})

app.post("/", HandleProcessPayment)

connectToDb().then(() => {
    const port = parseInt(process.env.EXPRESS_PORT || "0")
    app.listen(port, () => {
        console.log(`Payments is on ${port}`)
    })
}).catch((err) => {
    console.error(err)
})
