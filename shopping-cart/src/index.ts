import express from "express";
import cookieParser from "cookie-parser";
import { connectToDb, passport } from "./util";
import { GetCart, RemoveCart, SetCart } from "./handlers";
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

// Health Check
app.get("/", (req, res)=>{res.sendStatus(200)});

app.get("/v1", passport.authenticate("jwt", { session: false }), GetCart);
app.post("/v1", passport.authenticate("jwt", { session: false }), SetCart);
app.delete("/v1", passport.authenticate("jwt", { session: false }), RemoveCart);

// Health Check
app.get("/", (req, res)=>{res.sendStatus(200)});

connectToDb().then(() => {
	const port = parseInt(process.env.EXPRESS_PORT || "0");
	app.listen(port, () => {
		console.log(`ShoppingCart is on ${port}`);
	});
}).catch((err) => {
	console.error(err);
});
