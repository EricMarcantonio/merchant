import { useEffect, useState } from "react";
import { container } from "../GlobalContainer";
import { GetShoppingCart } from "../backend";
import Counter from "./Counter";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
	const con = container.useContainer();
	const [render, setRender] = useState(false);
	const [total, setTotal] = useState(0);
	var itemTotal = 0;
	const navigate = useNavigate();

	useEffect(() => {
		GetShoppingCart()
			.then((result) => {
				if (result) {
					con.setCart(result);
					for (let x in result) {
						const price = result[x].product.price;
						if (price) {
							itemTotal = itemTotal + price * result[x].units_requested;
						}
					}
					setTotal(itemTotal);
				}
			}).catch(() => {
		}).finally(() => {
			setRender(true);
		});

	}, []);


	const handleGetTotal = () => {
		for (let x in con.cart) {
			const price = con.cart[x].product.price;
			if (price) {
				itemTotal = itemTotal + price * con.cart[x].units_requested;
			}
		}
		setTotal(itemTotal);
	};

	return (
		<div className="bg-white">
			{!render ? (
				<Loading />
			) : (
				<div>
					{Object.keys(con.cart).length == 0 ? (
						<EmptyCart />
					) : (
						<div>
							<div className="px-40 py-5">
								<div className="flex flex-col bg-white rounded-md shadow-xl bg-gray-200">
									{con.cart &&
										Object.keys(con.cart).map((eachItem) => {
											return (
												<a key={eachItem} className="group">
													<div
														className="max-w-2xl mx-auto pt-5 pb-2 px-4 sm:px-6 lg:max-w-7xl lg:pt-10 lg:pb-10 lg:px-8 lg:grid lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
														<div className="rounded-lg overflow-hidden">
															<img
																src={con.cart[eachItem].product.pictureUrl}
																className="w-full h-full object-center object-cover"
															/>
														</div>
														<div
															className="py-10 lg:pt-2 lg:pb-2 lg:col-start-2 lg:col-span-3 lg:pr-8">
															<div className="lg:border-r lg:border-gray-200 lg:pr-8">
																<h1 className="font-extrabold tracking-tight text-gray-900 sm:text-1xl">
																	{con.cart[eachItem].product.name}
																</h1>
															</div>

															<div
																className="py-10 lg:pt-2 lg:pb-4 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
																<h3 className="sr-only">Description</h3>
																<div className="space-y-6">
																	<p className="text-base text-gray-900 break-all">
																		{con.cart[eachItem].product.price}
																	</p>
																</div>
															</div>
														</div>

														<div className="lg:col-start-5 lg:col-span-2">
															{
																<Counter
																	item_num={+eachItem}
																	getTotal={handleGetTotal}
																/>
															}
														</div>
													</div>
												</a>
											);
										})}
								</div>
							</div>

							<div
								className="max-w-2xl mx-auto pt-5 pb-2 px-4 sm:px-6 lg:max-w-7xl lg:pt-10 lg:pb-10 lg:px-8 lg:grid lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr]">
								<div
									className="lg:max-w-7xl lg:pt-10 lg:pb-10 lg:px-8 lg:grid lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] p-5 lg:col-start-4 lg:col-span-2 flex flex-col bg-white rounded-md shadow-xl bg-gray-200">
									<div className="lg:col-start-1 lg:col-span-1">Total:</div>
									<div className="relative lg:col-start-2 lg:col-span-1">
										<div className="absolute inset-y-0 right-0">{total}</div>
									</div>
								</div>
							</div>

							<div className="w-screen flex pb-10">
								<div className="mx-auto">
									<button
										type="submit"
										onClick={() => {
											navigate(`/address`);
										}}
										className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Place Order
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ShoppingCart;
