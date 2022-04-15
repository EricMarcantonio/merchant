import "antd/dist/antd.css";
import { Steps } from "antd";
import "../../src/index.css";
import {
  ShoppingFilled,
  CreditCardFilled,
  LoadingOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { container } from "../GlobalContainer";
import {VerifyUser} from "../backend/auth";
import Loading from "./Loading";
import {ToastFactory} from "../types/toasts";
import {GetShoppingCart} from "../backend";

const { Step } = Steps;

const AddressForm = () => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const con = container.useContainer();
  const navigate = useNavigate();

  const factory = new ToastFactory();
  const err = factory.createToast("ERROR", "You must be logged in to place an order!")
  const errNoCart = factory.createToast("ERROR", "You don't have anything in your cart")

  useEffect(() => {
    if (!con.user.id){
      VerifyUser().then((user) => {
        con.setUser(user)
        if (Object.keys(con.cart).length === 0){
          GetShoppingCart().then((cart) => {
            if (Object.keys(con.cart).length === 0){
              errNoCart.run().then(() => {
                navigate('/products')
              })
            }
          })
        }
      }).catch(() => {
        err.run(1200).then(() => {
          navigate("/login")
        })
      })
    } else {
      if (Object.keys(con.cart).length === 0){
        GetShoppingCart().then((cart) => {
          if (Object.keys(con.cart).length === 0){
            errNoCart.run().then(() => {
              navigate('/products')
            })
          }
        })
      }
    }
  }, [])

  if (!con.user.id){
    return <Loading/>
  }

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Where should we send your order?
            </h2>
            <p className="text-center text-sm text-gray-600">
              Enter your name and address:
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={() => {
              con.setAddress({
                firstname: firstname,
                lastname: lastname,
                street: street,
                province: province,
                zip: zip,
                phone: phoneNumber,
                country: country,
              });
              navigate(`/payment`);
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first"
                  name="first"
                  type="first"
                  autoComplete="first"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirst(e.target.value);
                  }}
                  value={firstname}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last"
                  name="street"
                  type="street"
                  autoComplete="street"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLast(e.target.value);
                  }}
                  value={lastname}
                />
              </div>
              <div>
                <label htmlFor="Street" className="sr-only">
                  Street
                </label>
                <input
                  id="street"
                  name="street"
                  type="street"
                  autoComplete="street"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Street"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  value={street}
                />
              </div>
              <div>
                <label htmlFor="provice" className="sr-only">
                  Provice
                </label>
                <input
                  id="provice"
                  name="provice"
                  type="provice"
                  autoComplete="provice"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Provice"
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                  value={province}
                />
              </div>
              <div>
                <label htmlFor="zip" className="sr-only">
                  Zip Code
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="zip"
                  autoComplete="zip"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Zip Code"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  value={zip}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  value={phoneNumber}
                />
              </div>
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="country"
                  autoComplete="country"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Country"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  value={country}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Proceed To Payment
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-screen">
        <div className="w-1/2 mx-auto">
          <Steps>
            <Step status="finish" title="Cart" icon={<ShoppingFilled />} />
            <Step status="process" title="Address" icon={<LoadingOutlined />} />
            <Step status="wait" title="Pay" icon={<CreditCardFilled />} />
            <Step status="wait" title="Confirm" icon={<CheckCircleFilled />} />
          </Steps>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
