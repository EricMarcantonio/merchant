import express from "express";

import { connectToDb, passport } from "./util";

import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { HandleCreateReview, HandleGetReviewsByItemId } from "./handlers";
import { MiddleCreateReview, MiddleGetReviewById } from "./middleware";


const app = express();
const corsOptions = {
	origin: process.env.CORS_ORIGIN, credentials: true,
	optionsSuccessStatus: 200,
	methods: ["GET", "POST", "OPTIONS"],
} as CorsOptions;
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
	console.log(req.headers, req.method, req.cookies, req.url);
	next();
});

app.get("/:itemId", MiddleGetReviewById, HandleGetReviewsByItemId);
app.post("/", [passport.authenticate("jwt", { session: false }), MiddleCreateReview], HandleCreateReview);
app.get("/", (req, res)=>{res.sendStatus(200)});

connectToDb().then(() => {
	const port = parseInt(process.env.EXPRESS_PORT || "0");
	app.listen(port, () => {
		console.log(`Reviews is on ${port}`);
	});
}).catch((err) => {
	console.error(err);
});
