import { IOrderData, IOrderItem, IProduct } from "../types";
import moment from "moment";
import { useEffect, useState } from "react";
import { GetAProductByIdFromBackend } from "../backend";
import { GetAllOrders } from "../backend/orders";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { ToastFactory } from "../types/toasts";

interface IOrderItemProps {
	order: IOrderData;
}

const CAD = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "CAD",

});

export const OrderItem = (props: IOrderItemProps) => {

	const [item, setItem] = useState({} as IProduct);
	useEffect(() => {
		GetAProductByIdFromBackend(props.order.itemId).then((product) => {
			setItem(product);
		});
	}, []);

	if (item == null){

	}

	return (
		<li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
			<div className="w-0 flex-1 flex items-center">
        <span className="ml-2 flex-1 w-0 truncate">
          {item.name}
        </span>
			</div>
			<div className="ml-4 flex-shrink-0">
				<span className="ml-2 flex-1 w-0 truncate">{props.order.units}</span>
			</div>
			<div className="ml-4 flex-shrink-0">
				<span className="ml-2 flex-1 w-0 truncate">{CAD.format(item.price ? item.price : 0)}</span>
			</div>
		</li>
	);
};

interface IOrderComponentProps {
	order: IOrderItem;
}

export const OrderComponent = (props: IOrderComponentProps) => {

	const [price, setPrice] = useState("");


	useEffect(() => {
		Promise.all(props.order.orderData.map((orderData) => GetAProductByIdFromBackend(orderData.itemId))).then((allRequestedProducts) => {
			let temp = 0;
			for (let x of allRequestedProducts) {
				if (x.price && x.id) {
					temp += x.price * props.order.orderData.filter((orderData) => orderData.itemId === x.id)[0].units;
				}
			}

			setPrice(CAD.format(temp));

		});
	}, []);

	console.log(props.order.order);

	return (
		<div className="bg-white shadow-lg overflow-hidden sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6 border-t border-gray-200">
				<h3 className="text-lg leading-6 font-medium text-gray-900 justify-between flex">
					<div>
						Order #{props.order.order["0"].id}
					</div>
					<div>
						<div
							className="text-xs sm:mt-0 sm:col-span-2 py-1 px-2.5 leading-none font-bold bg-yellow-500 text-white rounded">
							{props.order.order["0"].status}
						</div>
					</div>

				</h3>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Date</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{moment(props.order.order.updatedAt).utc().local().format("MMMM Do YYYY")}
						</dd>
					</div>
					<div className="bg-white px-4 py-5">
						<dt className="text-sm font-medium text-gray-500">Items</dt>
						<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							<ul
								role="list"
								className="border border-gray-200 rounded-md divide-y divide-gray-200"
							>
								{/* <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <span className="ml-2 flex-1 w-0 truncate">
                      Name
                    </span>
                  </div>
                  <div className="">
                    <span className="">Units</span>
                  </div>
                  <div className="">
                    <span className="">Price</span>
                  </div>
                </li> */}
								{
									props.order.orderData.map((orderData) => {
										return <OrderItem order={orderData} key={orderData.id} />;
									})
								}
							</ul>
						</div>
					</div>
					<div className="bg-white px-4 py-5 grid grid-cols-3">
						<dt className="text-sm font-medium text-gray-500">Total</dt>
						<div></div>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 mr-0">
							{price}
						</dd>
					</div>

				</dl>
			</div>
		</div>
	);
};


const OrderList = () => {
	const [orders, setOrders] = useState([] as IOrderItem[]);
	const [render, setRender] = useState(true);

	const navigate = useNavigate();

	const factory = new ToastFactory();
	const err = factory.createToast("ERROR", "You don't have any orders!");
	const getOrderErr = factory.createToast("ERROR", "There are no errors");

	useEffect(() => {
		GetAllOrders().then(async (orders) => {
			if (orders.length === 0){
				await err.run(2000);
				setRender(false)
			}
			setOrders(orders);
		}).catch(async () => {
			await getOrderErr.run(2000);
			setRender(false)
		})
	}, []);

	if (!render){
		navigate("/cart");
		return <Loading/>
	}


	return (
		<div className="bg-black">
			<div className="w-screen mx-auto container">
				<div className="w-2/3 mx-auto space-y-4">
					{
						orders && orders.map((order) => {
							return <OrderComponent order={order} key={order.order.id} />;
						})
					}
				</div>


			</div>
		</div>
	);
};

export default OrderList;
