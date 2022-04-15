import {IOrderItem} from "../types";
import {a} from "./types";

interface IGetOrders {
    [key: string]: IOrderItem
}


export const GetAllOrders = () => {
    return a.request<IGetOrders>({
        method: 'get', url: '/orders/all', withCredentials: true,
    })
        .then((response) => {
            console.log(response.data);

            return Object.keys(response.data).map((id) => response.data[id]);
        })
};