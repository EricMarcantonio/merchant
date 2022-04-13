import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IProduct} from "../types";
import axios from "axios";
import {GetAllProductsFromBackend} from "../backend";
import {container} from "../GlobalContainer";
import {GetReviewsByItemId} from "../backend/products";

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

const ProductList = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState<IProduct[]>();
    const [allItems, setAllItems] = useState([] as IProductWithReview[])
    const cart = container.useContainer();

    useEffect(() => {
        GetAllProductsFromBackend().then((result) => {
            const reviewIds = result.map((res) => GetReviewsByItemId(res.id || 0))
            Promise.all(reviewIds).then((data) => {
                setAllItems(result && result.map((res) => {
                    return {
                        product: res,
                        review: data.filter((da) => {
                            if (da[0] && da[0].itemId && res.id === da[0].itemId) {
                                return da
                            }
                        })[0]
                    }
                }))
            })

            if (!result) {
                console.log("There was an error getting the products");
            } else {
                setItems(result);
            }
        });
    }, []);

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div
                    className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {allItems &&
                        allItems.map((item) => {
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
                                </div>
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
