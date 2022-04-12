import "antd/dist/antd.css";
import { Steps } from "antd";
import "../../src/index.css";
import {
  ShoppingFilled,
  HomeFilled,
  LoadingOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const { Step } = Steps;
const PaymentForm = () => {
  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              How do you want to pay?
            </h2>
            <p className="text-center text-sm text-gray-600">
              Enter your payment information:
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="card-number" className="sr-only">
                  Card Number
                </label>
                <input
                  id="card-number"
                  name="card-number"
                  type="card-number"
                  autoComplete="card-number"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Card Number"
                />
              </div>
              <div>
                <label htmlFor="expiration" className="sr-only">
                  Expiration MM/YY
                </label>
                <input
                  id="expiration"
                  name="expiration"
                  type="expiration"
                  autoComplete="expiration"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Expiration MM/YY"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="sr-only">
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="cvv"
                  autoComplete="cvv"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="CVV"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Order Confirmation
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-screen">
        <div className="w-1/2 mx-auto">
          <Steps>
            <Step status="finish" title="Cart" icon={<ShoppingFilled />} />
            <Step status="finish" title="Address" icon={<HomeFilled />} />
            <Step status="process" title="Pay" icon={<LoadingOutlined />} />
            <Step status="wait" title="Confirm" icon={<CheckCircleFilled />} />
          </Steps>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
