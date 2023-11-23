import { loadStripe } from "@stripe/stripe-js";
import SectionTile from "../../../components/SectionTitle/SectionTile";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

import UseCart from "../../../hooks/UseCart";

const stripePromise=loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [cart ] = UseCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const price = parseInt(total.toFixed(2))
    return (
        <div>
           <SectionTile heading="Payment" subheading="Please pay to eat"></SectionTile> 
           <div>
            <Elements stripe={stripePromise}>
           <CheckOutForm cart={cart} price={price}></CheckOutForm>
            </Elements>
           </div>
        </div>
    );
};

export default Payment;