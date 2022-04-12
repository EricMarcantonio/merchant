import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { container } from "../GlobalContainer";
import {
  GetAllProductsFromBackend,
  GetAProductByIdFromBackend,
  tempCart,
  UpdateShoppingCart,
  GetShoppingCart,
  AdminLogin,
  DeleteItemFromCart,
} from "../backend";
import Counter from "./Counter";
import { ICart, IProduct, ICartUpdate } from "../types";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";

const ShoppingCart = () => {
  const con = container.useContainer();
  const [render, setRender] = useState(false);
  const [total, setTotal] = useState(0);
  var itemTotal = 0;

  useEffect(() => {
    let cartArray: Promise<IProduct>[] = [];

    GetShoppingCart()
      .then((result) => {
        if (!result) {
          console.log("There was an error getting the products");
        } else {
          
          for (let eachItem of result) {
            // console.log("eachitem:", eachItem);
            console.log(eachItem)
            cartArray.push(GetAProductByIdFromBackend(eachItem.itemId));
            //console.log(result[eachItem].ITEM_ID);
          }
        }
        return result;
      })
      .then((itemsWithoutDesc) => {
        
        if (cartArray) {
          Promise.all<IProduct>(cartArray).then((data) => {
            for (let eachItem of data) {
              con.setCart((prevState) => {
                let temp = prevState;

                if (eachItem.id) {
                  if (temp[eachItem.id?.toString()]) {
                    temp[eachItem.id?.toString()].product = eachItem;
                  } else {
                    temp[eachItem.id?.toString()] = {
                      product: eachItem,
                      units_requested: itemsWithoutDesc.filter(
                        (orderItem) => orderItem.itemId == eachItem.id
                      )[0].units,
                    };
                  }
                }

                return temp;
              });
            }
            setRender(true);
            handleGetTotal();
          });
          console.log("con.cart", con.cart);
        }
      });
  }, []);

  const handleAddToCart = (item: number, val: number) => {
    UpdateShoppingCart([
      {
        itemId: item,
        units: val,
      },
    ]).then((result) => {
      if (!result) {
        console.log("There was an error updating the products");
      } else {
        console.log(result);
      }
    });
  };

  const handleAdminLogin = () => {
    AdminLogin().then((result) => {
      if (!result) {
        console.log("There was an error logging in");
      } else {
        console.log(result);
      }
    });
  };

  const handleGetCart = () => {
    GetShoppingCart().then((result) => {
      if (!result) {
        console.log("There was an error getting the products");
      } else {
        for (let eachItem of result) {
          console.log(eachItem.itemId);

          //console.log(result[eachItem].ITEM_ID);
        }
      }
    });
  };

  const handleGetTotal = () => {
    console.log("ran");
    for (let x in con.cart) {
      const price = con.cart[x].product.price;
      if (price) {
        itemTotal = itemTotal + price * con.cart[x].units_requested;
      }
    }
    setTotal(itemTotal);
  };

  return (
    <div className="bg-white">
      {!render ? (
        <Loading />
      ) : (
        <div>
          {Object.keys(con.cart).length == 0 ? (
            <EmptyCart />
          ) : (
            con.cart &&
            Object.keys(con.cart).map((eachItem) => {
              return (
                <a key={eachItem} className="group">
                  <div className="px-40 py-20">
                    <div className="flex flex-col bg-white rounded-md shadow-xl bg-gray-200">
                      <div className="max-w-2xl mx-auto pt-5 pb-2 px-4 sm:px-6 lg:max-w-7xl lg:pt-10 lg:pb-10 lg:px-8 lg:grid lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={con.cart[eachItem].product.pictureUrl}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="py-10 lg:pt-2 lg:pb-2 lg:col-start-2 lg:col-span-3 lg:pr-8">
                          <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="font-extrabold tracking-tight text-gray-900 sm:text-1xl">
                              {con.cart[eachItem].product.name}
                            </h1>
                          </div>

                          <div className="py-10 lg:pt-2 lg:pb-4 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                              <p className="text-base text-gray-900 break-all">
                                {con.cart[eachItem].product.price}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-start-5 lg:col-span-2">
                          {
                            <Counter
                              item_num={+eachItem}
                              getTotal={handleGetTotal}
                            />
                          }
                        </div>
                      </div>
                      <div className="right-0">{total}</div>
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
