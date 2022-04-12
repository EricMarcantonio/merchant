import "./App.css";
import { Routes, Route } from "react-router-dom";
import "react-router";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import ItemPage from "./ItemPage";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";

import CartPage from "./CartPage";

import OrdersPage from "./OrdersPage";
import OrderPage from "./AddressPage";
import AddressPage from "./AddressPage";
import PaymentPage from "./PaymentPage";


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
      </Routes>
    </>
  );
}
