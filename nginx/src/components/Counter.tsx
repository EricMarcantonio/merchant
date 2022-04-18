import { container } from "../GlobalContainer";
import { ICartUpdate } from "../types";
import { DeleteItemFromCart, UpdateShoppingCart } from "../backend";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { TrashIcon } from "@heroicons/react/solid";
import { ToastFactory } from "../types/toasts";

interface ICounterProps {
	item_num: number;
	getTotal: () => void;
}

const Counter = ({ item_num, getTotal }: ICounterProps) => {
	const con = container.useContainer();
	// var item: number = +props.item_num;
	const [dec, setDec] = useState(<div>-</div>);
	const [inc, setInc] = useState(<div>+</div>);
	const [trash, setTrash] = useState(<TrashIcon className="w-5 h-5" />);
	const [disableButton, setDisableButton] = useState(false);
	var total = 0;

	const toast = new ToastFactory();
	const errCant = toast.createToast("ERROR", "Please delete the item!");
	const err = toast.createToast("ERROR", "There was an error, try again!");
	const success = toast.createToast("SUCCESS", "Success!");
	const handleDecrease = async () => {
		if (con.cart[item_num].units_requested >= 2) {
			setDisableButton(true);
			setDec(
				<LoadingOutlined style={{ fontSize: "25px", color: "#FFFFFF" }} />,
			);
			let temp = con.cart;
			//check to make sure this exists first!!!!

			let sendToBackend: ICartUpdate[] = [
				{
					itemId: item_num,
					units: temp[item_num].units_requested - 1,
				},
			];
			UpdateShoppingCart(sendToBackend)
				.then(async (result) => {

					temp[item_num].units_requested = temp[item_num].units_requested - 1;
					setDisableButton(false);
					con.setCart(temp);
					setDec(<div>-</div>);
					getTotal();
					await success.run(1000);

				}).catch(async (e) => {
				await err.run(1300);
				setDisableButton(false);
				setDec(<div>-</div>);
			})
				.finally(() => {
					setDec(<div>-</div>);
				});
		} else {
			await errCant.run(1400);
		}
	};

	const handleIncrease = () => {
		setDisableButton(true);
		setInc(<LoadingOutlined style={{ fontSize: "25px", color: "#FFFFFF" }} />);
		let temp = con.cart;
		//check to make sure this exists first!!!!

		let sendToBackend: ICartUpdate[] = [
			{
				itemId: item_num,
				units: temp[item_num].units_requested + 1,
			},
		];
		console.log([sendToBackend]);
		UpdateShoppingCart(sendToBackend)
			.then((result) => {
				// if (result) {
				temp[item_num].units_requested = temp[item_num].units_requested + 1;
				setDisableButton(false);
				con.setCart(temp);
				setInc(<div>+</div>);
				getTotal();
				success.run()
				// } else {

				// }
			}).catch((eerr) => {
				err.run();
			setDisableButton(false);
			setInc(<div>+</div>);
		})
			.finally(() => {
				setInc(<div>+</div>);
			});
	};

	const handleDeleteItemFromCart = (id: number) => {
		setDisableButton(true);
		setTrash(
			<LoadingOutlined style={{ fontSize: "25px", color: "#FFFFFF" }} />,
		);

		DeleteItemFromCart(id).then((result) => {
			if (!result) {
				alert("There was an error deleting the item. Please try again.");
				setDisableButton(false);
				setTrash(trash);
			} else {
				setDisableButton(false);
				setTrash(trash);
				window.location.reload();
			}
		});
	};

	return (
		<div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
			<button
				className="bg-gray-400 text-gray-600 hover:text-gray-800 hover:bg-gray-500 h-full w-10 rounded-l cursor-pointer outline-none"
				onClick={() => handleDecrease()}
				disabled={disableButton}
			>
				{dec}
			</button>
			<input
				className="place-content-center outline-none focus:outline-none text-center w-20 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
				value={con.cart[item_num].units_requested}
			></input>
			<button
				className="bg-gray-400 text-gray-600 hover:text-gray-800 hover:bg-gray-500 h-full w-10 rounded-r cursor-pointer"
				onClick={() => handleIncrease()}
				disabled={disableButton}
			>
				{inc}
			</button>
			<button
				className="mx-10 h-10 w-10 bg-red-600 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
				onClick={() => {
					handleDeleteItemFromCart(item_num);
				}}
				disabled={disableButton}
			>
				{trash}
			</button>
			{(function() {
				const price = con.cart[item_num].product.price;
				if (price) {
					total = price * con.cart[item_num].units_requested;
					//getTotal(price);
				}
			})()}
		</div>
	);
};

export default Counter;
