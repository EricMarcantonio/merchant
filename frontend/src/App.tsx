import "./App.css";
import { Route, Routes } from "react-router-dom";
import "react-router";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import ItemPage from "./ItemPage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";
import CartPage from "./CartPage";
import OrdersPage from "./OrdersPage";
import AddressPage from "./AddressPage";
import PaymentPage from "./PaymentPage";
import AnalyticsPage from "./AnalyticsPage";
import ConfirmPage from "./ConfirmPage";

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/products/:id" element={<ItemPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="/address" element={<AddressPage />} />
				<Route path="/payment" element={<PaymentPage />} />
				<Route path="/login" element={<LogInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/analytics" element={<AnalyticsPage />} />
				<Route path="/confirm" element={<ConfirmPage />} />
			</Routes>
		</>
	);
}
