import express from "express";
import cookieParser from "cookie-parser";
import { connectToDb, passport } from "./util";
import { GetUserFNmae, HandleCreateUser, HandleLogin, HandleLogout, HandleVerify } from "./handlers";
import cors, { CorsOptions } from "cors";

const app = express();

const corsOptions = {
	origin: process.env.CORS_ORIGIN, credentials: true,
	optionsSuccessStatus: 200,
} as CorsOptions;
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
	console.log(req.headers, req.method, req.cookies, req.url);
	next();
});

app.post("/v1/register", HandleCreateUser);
app.post("/v1/login", HandleLogin);
app.post("/v1/logout", HandleLogout);
app.post("/v1/verify", passport.authenticate("jwt", { session: false }), HandleVerify);
app.get("/v1/user/:id", GetUserFNmae);

// Health Check
app.get("/", (req, res)=>{res.sendStatus(200)});

connectToDb().then(() => {
	const port = parseInt(process.env.EXPRESS_PORT || "0");
	app.listen(port, () => {
		console.log(`Auth is on ${port}`);
	});
}).catch((err) => {
	console.error(err);
});
