import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { UserRegister } from "../backend";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { container } from "../GlobalContainer";
import { ErrorToast, SuccessToast, ToastFactory } from "../types/toasts";

const SignUpForm = () => {
	const navigate = useNavigate();

	const [render, setRender] = useState(true);
	const [firstname, setFirst] = useState("");
	const [lastname, setLast] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [buttonText, setButtonText] = useState("Sign up");
	const [isAdmin, setIsAdmin] = useState(false);
	const factory = new ToastFactory();

	const con = container.useContainer();

	const handleRegister = (
		firstname: string,
		lastname: string,
		email: string,
		username: string,
		password: string,
	) => {
		setButtonText("Loading");
		UserRegister(firstname, lastname, email, username, password, isAdmin)
			.then(async (result) => {
				if (!result) {
					const toast = factory.createToast(
						"ERROR",
						"There was an error registering user",
					) as ErrorToast;
					await toast.run(3000);
				} else {
					setButtonText("Sign up");
					console.log(result);
					con.setUser(result);
					const toast = factory.createToast(
						"SUCCESS",
						"Successful sign up",
					) as SuccessToast;
					await toast.run();
					navigate(`/products`, { state: { user: result } });
				}
			})
			.catch(async (err) => {
				setButtonText("Sign up");
				const toast = factory.createToast(
					"ERROR",
					Object.values(err.response.data)[0] as string,
				) as ErrorToast;
				await toast.run(3000);

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
								Create an account
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600">
								Or{" "}
								<a
									href="/login"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									log in
								</a>
							</p>
						</div>
						<form
							className="mt-8 space-y-6"
							action="#"
							method="POST"
							onSubmit={(e) => {
								e.preventDefault();
								handleRegister(firstname, lastname, email, username, password);
							}}
						>
							<input type="hidden" name="remember" defaultValue="true" />
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="first-name" className="sr-only">
										First Name
									</label>
									<input
										id="first-name"
										name="first"
										type="first"
										autoComplete="first"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="First Name"
										onChange={(e) => {
											setFirst(e.target.value);
										}}
										value={firstname}
									/>
								</div>
								<div>
									<label htmlFor="last-name" className="sr-only">
										Last Name
									</label>
									<input
										id="last-name"
										name="last"
										type="last"
										autoComplete="last"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Last Name"
										onChange={(e) => {
											setLast(e.target.value);
										}}
										value={lastname}
									/>
								</div>
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
									<label htmlFor="username" className="sr-only">
										Username
									</label>
									<input
										id="username"
										name="username"
										type="username"
										autoComplete="username"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Username"
										onChange={(e) => {
											setUsername(e.target.value);
										}}
										value={username}
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
										autoComplete="password"
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
								<label htmlFor="isAdmin" className="font-black text-lg mx-3">
									Are you an admin?
								</label>
								<input
									id="isAdmin"
									name="isAdmin"
									type="checkbox"
									onChange={(e) => {
										setIsAdmin(!isAdmin);
									}}
								/>
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

export default SignUpForm;
