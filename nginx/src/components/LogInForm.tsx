import { LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../backend";
// import { verify } from "../backend/products";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import { ErrorToast, SuccessToast, ToastFactory } from "../types/toasts";
import { VerifyUser } from "../backend/auth";


const LogInForm = () => {
	const [render, setRender] = useState(true);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [buttonText, setButtonText] = useState("Log in");
	const factory = new ToastFactory();
	const toast = factory.createToast(
		"SUCCESS",
		"Successful log in",
	);
	const handleAdminLogin = (email: string, password: string) => {
		setButtonText("Loading");
		AdminLogin(email, password)
			.then(async (result) => {

					setButtonText("Log in");
					await toast.run();
					navigate(`/products`);

			})
			.catch(async (err) => {
				setButtonText("Log in");
				const toast = factory.createToast(
					"ERROR",
					Object.values(err.response.data)[0] as string,
				) as ErrorToast;
				await toast.run();
				console.log("Log in failed");
			});
	};

	return (
		<div>
			{!render ? (
				<Loading />
			) : (
				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Log in to your account
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600">
								Or{" "}
								<a
									href="/signup"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									sign up
								</a>
							</p>
						</div>
						<form
							className="mt-8 space-y-6"
							action="#"
							method="POST"
							onSubmit={(e) => {
								e.preventDefault();
								handleAdminLogin(email, password);
							}}
						>
							<input type="hidden" name="remember" defaultValue="true" />
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="email-address" className="sr-only">
										Email address
									</label>
									<input
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Email address"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										value={email}
									/>
								</div>
								<div>
									<label htmlFor="password" className="sr-only">
										Password
									</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										value={password}
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
						className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
						aria-hidden="true"
					/>
                  </span>
									{buttonText}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default LogInForm;
