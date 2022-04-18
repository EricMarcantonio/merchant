import express from "express";
import cookieParser from "cookie-parser";
import {connectToDb, db, passport} from "./util";
import {GetEvents, GetOrders, SetEvent} from "./handlers";
import cors from "cors";

const app = express();

app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true,
	optionsSuccessStatus: 200,
	methods: ["GET", "POST", "OPTIONS", "DELETE"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
	console.log(req.headers, req.method, req.cookies, req.url);
	next();
});

app.get("/v1/event", passport.authenticate("jwt", { session: false }), GetEvents);
app.get("/v1/orders", passport.authenticate("jwt", { session: false }), GetOrders);
app.post("/v1/event", passport.authenticate("jwt", { session: false }), SetEvent);

// Health Check
app.get("/", (req, res)=>{res.sendStatus(200)});

connectToDb().then(async () => {
	const port = parseInt(process.env.EXPRESS_PORT || "0");
	app.listen(port, () => {
		console.log(`Visiting is on ${port}`);
	});
}).catch((err) => {
	console.error(err);
});
