import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { LoginIcon, LogoutIcon, MenuIcon, ShoppingBagIcon, XIcon } from "@heroicons/react/outline";
import { container } from "../GlobalContainer";
import { LogoutUser, VerifyUser } from "../backend/auth";
import { GetShoppingCart } from "../backend";
import { ToastFactory } from "../types/toasts";
import { useNavigate } from "react-router-dom";

const navigation = {
	pages: [
		{ name: "Products", href: "/products" },
	],
};

export default function Navbar() {
	const [open, setOpen] = useState(false);

	const con = container.useContainer();
	const [cartNum, setCartNum] = useState(0);
	const navigate = useNavigate();
	const factory = new ToastFactory();
	const loggedOutToast = factory.createToast("SUCCESS", "Logged out!");

	useEffect(() => {

		if (!con.user.id) {
			Promise.all([VerifyUser(), GetShoppingCart()]).then((data) => {
					con.setUser(data[0]);
					setCartNum(data[1] && Object.keys(data[1]).length || 0);
					con.setCart(data[1] || {});
				},
			);
		} else {
			if (Object.keys(con.cart).length === 0) {
				Promise.all([GetShoppingCart()]).then((data) => {
						setCartNum(data[0] && Object.keys(data[0]).length || 0);
						con.setCart(data[0] || {});
					},
				);
			} else {
				setCartNum(Object.keys(con.cart).length);
			}
		}
	}, []);

	useEffect(() => {
		if (Object.keys(con.cart).length === 0) {
			Promise.all([GetShoppingCart()]).then((data) => {
					setCartNum(data[0] && Object.keys(data[0]).length || 0);
				},
			);
		} else {
			setCartNum(Object.keys(con.cart).length);
		}
	}, [Object.keys(con.cart).length]);

	return (
		<div className="bg-black">
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 flex z-40 lg:hidden"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div
							className="relative max-w-xs w-full bg-black shadow-xl pb-12 flex flex-col overflow-y-auto">
							<div className="px-4 pt-5 pb-2 flex">
								<button
									type="button"
									className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-white"
									onClick={() => setOpen(false)}
								>
									<span className="sr-only">Close menu</span>
									<XIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>

							<div className="border-t py-6 px-4 space-y-6">
								{navigation.pages.map((page) => (
									<div key={page.name} className="flow-root">
										<a
											href={page.href}
											className="-m-2 p-2 block font-medium text-white"
										>
											{page.name}
										</a>
									</div>
								))}
							</div>

							<div className="border-t border-white py-6 px-4 space-y-6">
								<div className="flow-root">
									<a href="#" className="-m-2 p-2 block font-medium text-white">
										Sign in
									</a>
								</div>
								<div className="flow-root">
									<a href="#" className="-m-2 p-2 block font-medium text-white">
										Create account
									</a>
								</div>
							</div>

							<div className="border-t border-white py-6 px-4">
								<a href="#" className="-m-2 p-2 flex items-center">
									<img
										src="https://tailwindui.com/img/flags/flag-canada.svg"
										alt=""
										className="w-5 h-auto block flex-shrink-0"
									/>
									<span className="ml-3 block text-base font-medium text-white">
                    CAD
                  </span>
									<span className="sr-only">, change currency</span>
								</a>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>

			<header className="relative bg-black">
				<nav
					aria-label="Top"
					className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				>
					<div>
						<div className="h-16 flex items-center">
							<button
								type="button"
								className="bg-black p-2 rounded-md text-white lg:hidden"
								onClick={() => setOpen(true)}
							>
								<span className="sr-only">Open menu</span>
								<MenuIcon className="h-6 w-6" aria-hidden="true" />
							</button>

							<div className="ml-4 flex lg:ml-0">
								<a href="/">
									<span className="sr-only">Workflow</span>
									<div className="text-white font-bold">MERCHANT</div>
								</a>
							</div>

							<Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="h-full flex space-x-8">
									{navigation.pages.map((page) => (
										<a
											key={page.name}
											href={page.href}
											className="flex items-center text-sm font-medium text-white hover:text-white"
										>
											{page.name}
										</a>
									))}
								</div>
							</Popover.Group>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{con.user.id ? (
										<>
											<div

												className="text-sm font-medium text-white hover:text-white"
											>
												Welcome back, <span
												className={" ml-1 font-bold"}>{con.user.fname}!</span>
											</div>
											<div

												className="text-sm font-medium text-white hover:text-white"
											>
												|
											</div>

											<a
												href="/orders"
												className="text-sm font-medium text-white hover:text-white"
											>
												My Orders
											</a>
										</>
									) : (
										<>
										</>
									)}
								</div>

								<div className="hidden lg:ml-8 lg:flex">
									<a
										href="#"
										className="text-white hover:text-white flex items-center"
									>
										<img
											src="https://tailwindui.com/img/flags/flag-canada.svg"
											alt=""
											className="w-5 h-auto block flex-shrink-0"
										/>
									</a>
								</div>


								<div className="ml-4 flow-root lg:ml-6">
									<a href="/cart" className="group -m-2 p-2 flex items-center">
										<ShoppingBagIcon
											className="flex-shrink-0 h-6 w-6 text-white group-hover:text-white"
											aria-hidden="true"
										/>
										<span className="ml-2 text-sm font-medium text-white group-hover:text-white">
                                            {cartNum}
                                        </span>
										<span className="sr-only">items in cart, view bag</span>
									</a>
								</div>
								{
									con.user.id ? <div className="ml-4 flow-root lg:ml-6" onClick={() => {
											LogoutUser().then(async () => {
												con.setUser({
													createdAt: new Date(),
													deletedAt: new Date(),
													updatedAt: new Date(),
													email: "",
													fname: "",
													id: 0,
													lname: "",
													username: "",
												});
												await loggedOutToast.run();
												navigate('/login')
											});
										}
										}>
											<div className="group -m-2 p-2 flex items-center">
												<LogoutIcon
													className="flex-shrink-0 h-6 w-6 text-white group-hover:text-white"
													aria-hidden="true"

												/>
											</div>
										</div>
										:
										<div className="ml-4 flow-root lg:ml-6">
											<a href="/login" className="group -m-2 p-2 flex items-center">
												<LoginIcon
													className="flex-shrink-0 h-6 w-6 text-white group-hover:text-white"
													aria-hidden="true"
												/>
											</a>
										</div>
								}

							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
}
