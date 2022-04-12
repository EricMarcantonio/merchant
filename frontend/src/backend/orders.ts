import axios
    from "axios";
import { IOrderData, IOrderItem } from "../types";

interface IGetOrders {
    [key: string]: IOrderItem
}


export const GetAllOrders = () => {
    return axios.request<IGetOrders>({
        method: 'get',
        url: 'http://127.0.0.1/orders/all',
        withCredentials: true,
    })
        .then((response) => {
            console.log(response.data)

            return Object.keys(response.data).map((id) => response.data[id]);
        })
}