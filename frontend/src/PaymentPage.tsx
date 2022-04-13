import { useNavigate } from "react-router";
import Navbar from "./components/Navbar";
import PaymentForm from "./components/PaymentForm";
import { container } from "./GlobalContainer";

const PaymentPage = () => {
  const navigate = useNavigate();
  const con = container.useContainer();
  
    return (
      <>
      if (con.address.firstname) {
        <><Navbar /><PaymentForm /></>
      }
      else  {
        navigate(`/address`)
      }
      </>
    );
};

export default PaymentPage;
