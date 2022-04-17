import { useEffect } from "react";
import { container } from "../GlobalContainer";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";
import { CheckCircleFilled, HomeFilled, LoadingOutlined, ShoppingFilled } from "@ant-design/icons";
import { Step } from "semantic-ui-react";
import { GetAProductByIdFromBackend } from "../backend";
import Counter from "./Counter";


export const Confirm = () => {
	const con = container.useContainer();
	const navigate = useNavigate();

	useEffect(() => {
		if (!con.user.id || !con.address.firstname || !con.payment.cardNumber){
			navigate("/products")
		} else {

		}
	}, []);


	return <div>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-screen space-y-8 mx-auto">
					<div>
						<h2 className="text-center text-3xl font-extrabold text-gray-900">
							Let's Confirm
						</h2>
						<p className="text-center text-sm text-gray-600">
							You are ordering the following items:
						</p>
					</div>
					<div>
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
												<div
													className="py-10 lg:pt-2 lg:pb-4 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
													<h3 className="sr-only">Description</h3>
													<div className="space-y-6">
														<p className="text-base text-gray-900 break-all">
															{con.cart[eachItem].units_requested}
														</p>
													</div>
												</div>
											</div>
										</div>
									</a>
								);
							})}
					</div>
					{/*Place current items*/}
					{/*Address*/}
					{/*CC info*/}
				</div>

			<div className="w-screen">
				<div className="w-1/2 mx-auto">
					<Steps>
						<Step status="finish" title="Cart" icon={<ShoppingFilled />} />
						<Step status="finish" title="Address" icon={<HomeFilled />} />
						<Step status="finish" title="Pay" icon={<LoadingOutlined />} />
						<Step status="process" title="Confirm" icon={<CheckCircleFilled />} />
					</Steps>
				</div>
			</div>
		</div>
	</div>
};