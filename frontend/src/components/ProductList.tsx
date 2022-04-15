import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IProduct} from "../types";
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
    const [allItems, setAllItems] = useState([] as IProductWithReview[]);
    const cart = container.useContainer();

    useEffect(() => {
        GetAllProductsFromBackend().then((result) => {
            const reviewIds = result.map((res) => GetReviewsByItemId(res.id || 0));
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
            });

            if (!result) {
                console.log("There was an error getting the products");
            } else {
                setItems(result);
            }
        });
    }, []);

    return (
        <div className="bg-white flex">

            <aside className="w-64 h-screen sticky top-0" aria-label="Sidebar">
                <div className="overflow-y-auto py-4 px-3 rounded-2xl my-1 mx-1 bg-black text-white">
                    <ul className="space-y-2">
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                                <span
                                    className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path
                                        d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                                <span
                                    className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>


                <div className=" py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div
                        className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
            </main>
        </div>

    );
};

export default ProductList;
