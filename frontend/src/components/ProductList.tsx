import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../types";
import { GetAllProductsFromBackend } from "../backend";
import { GetReviewsByItemId } from "../backend/products";
import Loading from "./Loading";

export interface IReview {
	id?: number
	userId: number,
	itemId: number,
	data: string,
	rating: number,
	createdAt?: string
}

interface IProductWithReview {
	product: IProduct,
	review: IReview[]
}


const Product = (item: IProductWithReview) => {
	const navigate = useNavigate();

	const rating = item.review && (item.review.map((i) => i.rating).reduce((a, b) => (a + b)) / item.review.length) || 0;
	return <div
		onClick={() => {
			navigate(`/products/${item.product.id}`);
		}}
		key={item.product.id}
	>
		<a key={item.product.id} className="group">
			<div
				className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
				<img
					src={item.product.pictureUrl}
					className="w-full h-full object-center object-cover group-hover:opacity-75"
				/>
			</div>
			<h3 className="mt-4 text-sm text-gray-700">{item.product.name}</h3>
			<p className="mt-1 text-lg font-medium text-gray-900">
				{item.product.price}
			</p>
		</a>
		<div>
			Rating: {rating}
		</div>
	</div>;
};

const ProductList = () => {

	const [allItems, setAllItems] = useState([] as IProductWithReview[]);
	const [brands, setBrands] = useState<string[]>([]);
	const [type, setTypes] = useState<string[]>([]);

	useEffect(() => {
		GetAllProductsFromBackend().then((result) => {
			const reviewIds = result.map((res) => GetReviewsByItemId(res.id || 0));
			Promise.all(reviewIds).then((data) => {
				const p = result.map((res) => {
					return {
						product: res,
						review: data.filter((da) => {
							if (da[0] && da[0].itemId && res.id === da[0].itemId) {
								return da;
							}
						})[0],
					};
				});
				setAllItems(p);
				p.forEach((pComp) => {
					setBrands((prevState) => {
						prevState.push(pComp.product.brand || "");
						return prevState;
					});
					setTypes((prevState) => {
						prevState.push(pComp.product.type || "");
						return prevState;
					});
				});
			});
		});
	}, []);


	return (
		<div className="bg-white flex">
			<aside className="w-64 h-screen sticky" aria-label="Sidebar">
				<div className="my-auto">
					I am the sidebar
				</div>
			</aside>
			<main>
				<div className=" py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
					<h2 className="sr-only">Products</h2>
					<div
						className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{() => {
							if (allItems) {
								let temp = allItems;
								if (brands.length > 0) {
									temp = temp.filter((i) => brands.includes(i.product.brand || ""));
								}
								if (type.length > 0) {
									temp = temp.filter((i) => type.includes(i.product.type || ""));
								}
								console.log("temp", temp)
								return temp.map((item) => {
									return <Product product={item.product} review={item.review}
													key={item.product.id} />;
								});
							} else {
								return <Loading/>
							}
						}
						}
					</div>
				</div>
			</main>
		</div>

	);
};

export default ProductList;
