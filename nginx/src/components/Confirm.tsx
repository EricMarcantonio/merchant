import { useEffect, useState } from "react";
import { container } from "../GlobalContainer";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../backend/orders";
import { ToastFactory } from "../types/toasts";


export const Confirm = () => {
	const con = container.useContainer();
	const navigate = useNavigate();
	const [total, setTotal] = useState(0);
	let itemTotal = 0;
	const handleGetTotal = () => {
		for (let x in con.cart) {
			const price = con.cart[x].product.price;
			if (price) {
				itemTotal = itemTotal + price * con.cart[x].units_requested;
			}
		}
		setTotal(itemTotal);
	};


	useEffect(() => {
		if (!con.user.id || !con.address.firstname || !con.payment.cardNumber) {
			navigate("/products");
		}
		handleGetTotal()
	}, []);

	const handleSubmit = () => {
		CreateOrder(con.address, con.address.firstname, con.address.lastname, { number: con.payment.cardNumber })
			.then(() => {
				goodOrder.run().then(() => {
					con.setAddress({
						country: "",
						firstname: "",
						lastname: "",
						phone: "",
						province: "",
						street: "",
						zip: ""
					});
					con.setPayment({
						cardNumber: "", cvv: "", expiration: ""
					});
					navigate("/orders")
				}).catch(async () => {
					await errOrder.run(1500)
				})
			})
	};

	const factory = new ToastFactory();
	const errOrder = factory.createToast("ERROR", "There was an error. Try again");
	const goodOrder = factory.createToast("SUCCESS", "Order Placed");

	return <div className="w-screen container mx-auto grid grid-rows-8 grid-cols-1 space-y-6 place-content-center">
		<div className={"w-5/6 grid grid-rows-8 grid-cols-1 space-y-6"}>
			<div className={""}>
				<div className=" text-3xl font-extrabold text-gray-900">
					Let's Confirm
				</div>
				<div className=" text-xl font-extrabold text-gray-900">
					Order
				</div>
			</div>
			<div className={"col-span-2"}>
				{con.cart &&
					Object.keys(con.cart).map((eachItem) => {
						return (
							<a key={eachItem}>
								<div className={"grid grid-cols-2"}>
									<div className="rounded-lg overflow-hidden h-24 w-24">
										<img
											src={con.cart[eachItem].product.pictureUrl}
											className="w-full h-full object-center object-cover"
										/>
									</div>
									<div>
										<div className="lg:border-r lg:border-gray-200 lg:pr-8">
											<h1 className="font-extrabold tracking-tight text-gray-900 sm:text-1xl">
												{con.cart[eachItem].product.name}
											</h1>
										</div>

										<div
											className="">
											<h3 className="sr-only">Description</h3>
											<div className="space-y-6">
												<p className="text-base text-gray-900 break-all">
													Price: {con.cart[eachItem].product.price}
												</p>
											</div>
										</div>
										<div
											className="">
											<h3 className="sr-only">Description</h3>
											<div className="space-y-6">
												<p className="text-base text-gray-900 break-all">
													Units: {con.cart[eachItem].units_requested}
												</p>
											</div>
										</div>
									</div>
								</div>
							</a>
						);
					})}
			</div>


			<div className={"col-span-2"}>
				<div className=" text-xl font-extrabold text-gray-900">
					Address
				</div>
				<div>
					Name: {con.address.firstname + " " + con.address.lastname}
				</div>
				<div>
					Street: {con.address.street}
				</div>
				<div>
					Zip: {con.address.zip}
				</div>
				<div>
					Phone: {con.address.phone}
				</div>
				<div>
					Country: {con.address.country}
				</div>
			</div>
			<div className={"col-span-2"}>
				<div className=" text-xl font-extrabold text-gray-900">
					Payment Details:
				</div>
				<div>
					Credit Card Number: {con.payment.cardNumber}
				</div>
				<div>
					Expiry: {con.payment.expiration}
				</div>
			</div>
			<div className="text-xl font-extrabold text-gray-900">
				Total: {total.toFixed(2)}
			</div><div></div>
			<div>
				<button onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Place order
				</button>
			</div>
		</div>
	</div>;
};