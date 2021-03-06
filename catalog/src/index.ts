import express from "express";

import { connectToDb, passport } from "./util";

import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { HandleGetAllItems, HandleGetItemById } from "./handlers";
import { MiddleGetItemById } from "./middleware";

const app = express();
const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
	methods: ["GET", "OPTIONS"],
} as CorsOptions;

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
	console.log(req.headers, req.method, req.cookies, req.url);
	next();
});


app.get("/all", HandleGetAllItems);
app.get("/:id", MiddleGetItemById, HandleGetItemById);

app.get("/", (req, res)=>{res.sendStatus(200)});


connectToDb().then(() => {
	const port = parseInt(process.env.EXPRESS_PORT || "0");
	app.listen(port, () => {
		console.log(`Catalog is on ${port}`);
	});
}).catch((err) => {
	console.error(err);
});
