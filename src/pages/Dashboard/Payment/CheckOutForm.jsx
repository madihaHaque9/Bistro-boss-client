import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import UseAxiosSecure from "../../../UseAxiosSecure/UseAxiosSecure";
// import UseCart from "../../../hooks/UseCart";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseCart from "../../../hooks/UseCart";


const CheckOutForm = ({cart,price}) => {
    const [error,setError]=useState('')
    const [clientSecret,setClientSecret]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const stripe=useStripe();
    const elements=useElements();
    const axiosSecure=UseAxiosSecure();
    const [,refetch]=UseCart();
    const navigate=useNavigate()
    const {user}=UseAuth()
    // const totalPrice= cart.reduce((total,item)=>total+item.price,0)
   useEffect(()=>{
   if(price>0){
    axiosSecure.post('/create-payment-intent',{price})
    .then(res=>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
    })
   }

   },[axiosSecure,price])
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card= elements.getElement(CardElement)
        if(card === null){
            return 
        }
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log("payment error",error)
            setError(error.message)
        }
        else{
            console.log("payment method",paymentMethod)
            setError('')
        }
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name:user?.displayName || 'anonymous'



                }

            }
        })
        if(confirmError){
            console.log("confirm error")
        }
        else{
            console.log(paymentIntent)
            if(paymentIntent.status ==="succeeded"){
                console.log("transaction id",paymentIntent.id)
                setTransactionId(paymentIntent.id);
               if(cart){
                const payment={
                    email:user.email,

                    price:price,
                    transactionId:paymentIntent.id,
                    date: new Date(),
                    cardIds: cart?.map(item=> item._id),
                    menuItemIds:cart?.map(item=>item.menuId),
                    status: 'pending'
                }
                axiosSecure.post('/payments',payment)
             .then(res=>{
                refetch();
             if(res.data?.paymentResult?.insertedId){
                Swal.fire({
                    icon:"success",
                    title:"Thanks for the money"



                })
                navigate('/dashboard/paymentHistory')
             }

             })

               }
                
             
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
 <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="text-green-700">Your Transaction Id:{transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;