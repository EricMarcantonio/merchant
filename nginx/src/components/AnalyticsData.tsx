import { useEffect, useState } from "react";
import { GetAnalytics, GetOrder } from "../backend/orders";
import { Table } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AnalyticsData = () => {


	const [data, setData] = useState([{}]);
	const [orders, setOrders] = useState([{}]);
	const navigate = useNavigate();
	useEffect(() => {
		GetAnalytics().then((data) => {
			data = data.map((d: any) => {
				d.createdAt = moment(d.createdAt).utc().local().format("MMMM Do YYYY");
				return d;
			});
			setData(data);
		}).catch(() => {
			navigate("/products")
		});

		GetOrder().then((data) => {
			setOrders(data);
		}).catch(() => {
			navigate("/products")
		});
	}, []);


	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "IP",
			dataIndex: "ipAddress",
			key: "ipAddress",
		},
		{
			title: "Item ID",
			dataIndex: "itemId",
			key: "itemId",
		}, {
			title: "Event",
			dataIndex: "eventType",
			key: "eventType",
		}, {
			title: "Address",
			dataIndex: "address",
			key: "address",
		}, {
			title: "Created",
			dataIndex: "createdAt",
			key: "createdAt",
		},
	];
	const cols = [
		{
			title: "Item ID",
			dataIndex: "itemId",
			key: "itemId",
		}, {
			title: "Time",
			dataIndex: "createdAt",
			key: "createdAt",
		}, {
			title: "Units",
			dataIndex: "OrderUnits",
			key: "OrderUnits",
		}, {
			title: "Name",
			dataIndex: "name",
			key: "name",
		}, {
			title: "Price per Item",
			dataIndex: "price",
			key: "price",
		},
	];


	return (
		<div className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
						MERCHANT
					</h2>
					<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						ANALYTICS
					</p>
				</div>
				<p className="text-center mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-500 sm:text-4xl">
					Visits
				</p>
				<Table dataSource={data} columns={columns} />
				<p className="text-center mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-500 sm:text-4xl">
					Orders
				</p>
				<Table dataSource={orders} columns={cols} />
			</div>
		</div>
	);
};

export default AnalyticsData;
