import express from "express";
import cookieParser from "cookie-parser";
import { connectToDb, passport } from "./util";
import { GetEvents, SetEvent } from "./handlers";
import cors from "cors";

const app = express();

app.use(cors({
	origin: "http://127.0.0.1:8080",
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

app.get("/v1", passport.authenticate("jwt", { session: false }), GetEvents);
app.post("/v1", passport.authenticate("jwt", { session: false }), SetEvent);


connectToDb().then(() => {
	const port = parseInt(process.env.EXPRESS_PORT || "0");
	app.listen(port, () => {
		console.log(`Visiting is on ${port}`);
	});
}).catch((err) => {
	console.error(err);
});
