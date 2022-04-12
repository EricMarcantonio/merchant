import { SetStateAction, useState } from "react";
import { createContainer } from "unstated-next";
import { ICart, IOrderItem } from "./types";
import { tempCart } from "./backend";

export const container = createContainer(() => {
  const [cart, setCart] = useState<ICart>(tempCart);
  const [count, setCount] = useState([0, 0, 0]);
  let [numItem, setNumItem] = useState(0);

  


  const addBag = () => {
    setNumItem((numItem = numItem + 1));
    console.log(numItem);
  };

  return {
    cart,
    setCart,
    count,
    setCount,
    numItem,
    setNumItem,
    addBag,
  };
});
