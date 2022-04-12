import axios from "axios";
import { IProduct, ICart, ICartUpdate, IOrderItem, IOrderData } from "../types";
import { UserAttributes } from "./types";

interface AxiosGetAllProductsInterface {
  data: {
    items: IProduct[];
  };
}

export const GetAllProductsFromBackend = () => {

  return axios.request<IProduct[]>({
    method: 'get',
    url: 'http://127.0.0.1/catalog/',
    })
  .then((response) => {
    return response.data;
 
  })
};

export const GetAProductByIdFromBackend = (id: number) => {

  return axios.request<IProduct>({
    method: 'get',
    url: `http://127.0.0.1/catalog/${id}/`,
    })
  .then((response) => {
    return response.data;
  })
};

interface IShoppingCart {
  cart: ICartItem[];
}

interface ICartItem {
  item_id: number;
  unit_req: number;
}

export const tempCart: ICart = {};

//tempCart.cart[0].item_id;
export const GetShoppingCartByUserToken = async (user_token: string) => {
  var data = JSON.stringify({
    user_token: "edniejdid",
  });

  return axios
    .request<IShoppingCart>({
      method: "post",
      url: "http://127.0.0.1:3020/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
    .then(function (response) {
      return response.data;
    });
};

export const UpdateShoppingCart = (cart: ICartUpdate[]) => {
  var data = JSON.stringify(cart);
  console.log(document.cookie);
  return axios({
    method: "post",
    url: "http://127.0.0.1/cart/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then(function (response) {
      console.log(response.data);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const GetShoppingCart = () => {

  return axios
    .request<IOrderData[]>({
      method: "get",
      url: "http://127.0.0.1/cart/",
      withCredentials: true,
    })
    .then((response) => {
      console.log("cart res", response.data)
      return response.data;
    });
};

export const AdminLogin = () => {
  let data = JSON.stringify({
    username: "2",
    password: "2",
  });

  return axios({
    method: "post",
    url: "http://127.0.0.1/auth/login/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((response) => {
      console.log("logged in");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const UserRegister = (firstname: string, lastname: string, email: string, username: string, password: string) => {
  var data = JSON.stringify({
    user: {
      username: username,
      email: email,
      fname: firstname,
      lname: lastname,
    },
    password: {
      password: password,
    }
  });
 
  return axios
    .request<UserAttributes>({
      method: "post",
      url: "http://127.0.0.1/auth/register/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
    .then((data) => {
      console.log("registered user");
      return data.data;
    });
};

export const DeleteItemFromCart = (id: number) => {
  var data = JSON.stringify([
    id
  ]);
    
  return axios({
    method: 'delete',
    url: 'http://127.0.0.1/cart/',
    withCredentials: true,
    headers: { 
      'Content-Type': 'application/json', 
    },
    data : data
  })
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return true;
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
  
};


export const verify = () => {

  axios({
    method: 'post',
    url: 'http://127.0.0.1/auth/verify/',
    withCredentials: true,
  })
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}