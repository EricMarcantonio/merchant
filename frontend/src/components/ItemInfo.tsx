import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetAProductByIdFromBackend,
  UpdateShoppingCart,
} from "../backend/products";
import { IProduct } from "../types";

const ItemInfo = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>();

  const handleAddToCart = (item: number, val: number) => {
    UpdateShoppingCart([
      {
        itemId: item,
        units: val,
      },
    ]).then((result) => {
      if (!result) {
        console.log("There was an error adding the product to cart");
      } else {
        console.log(result);
      }
    });
  };

  useEffect(() => {
    if (id) {
      GetAProductByIdFromBackend(parseInt(id)).then((data) => {
        setProduct(data);
      });
    } else {
      console.log("No Id was passed, probably 404");
    }
  }, []);
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={product?.pictureUrl}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {product?.name}
            </h1>
          </div>

          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{product?.price}</p>

            <div className="mt-6">
              <button
                type="submit"
                onClick={() => {
                  if (product?.id) {
                    handleAddToCart(product?.id, 1);
                  }
                }}
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </div>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
