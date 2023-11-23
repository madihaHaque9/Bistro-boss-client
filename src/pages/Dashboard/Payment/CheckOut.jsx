import { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Swal from 'sweetalert2';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../UseAxiosSecure/UseAxiosSecure';


const CheckOut = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = UseAuth();
    const [cardError, setCardError] = useState(null)
    const [confirmCardError, setConfirmCardError] = useState(null)

    const axiosSecure = UseAxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState(null)


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })

    }, [price, axiosSecure])






    const handleSubmit = async (e) => {
        e.preventDefault();
        setCardError(null)

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        // check card info with stripe apis
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
        } else {
            setCardError(null)
        }

        // set processing = true then the button will be active
        setProcessing(true)


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Unknown',
                    email: user?.email || 'Unknown'
                }
            }
        })
        if (confirmError) {
            setConfirmCardError(confirmError)
        }
        // set processing = false to disabled the button
        setProcessing(false)
        // check payment status
        if (paymentIntent.status === 'succeeded') {
            const transactionId = paymentIntent.id;
            setTransactionId(transactionId)

            // save payment info to the server
            if (cart) {
                const payment = {
                    user: user?.name,
                    email: user?.email,
                    transactionId,
                    price,
                    quantity: cart?.length,
                    items: cart?.map(item => item._id),
                    itemsName: cart?.map(item => item.name)
                }
                axiosSecure.post('/payments', payment)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Payment Successful ✅',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            }
        }
    }



    return (
        <>
            <form onSubmit={ handleSubmit }>
                <div className="mt-5">
                    <CardElement
                        options={ {
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
                        } }
                        className="px-2 py-5 border border-primary rounded-md"
                    />
                </div>
                <div className='flex justify-end mt-5'>
                    <button className='btn btn-primary btn-sm text-white' type="submit" disabled={ !stripe || !clientSecret || processing }>
                        Proceed To Payment
                    </button>
                </div>
            </form>
            { cardError && <div className="alert alert-error text-white font-semibold mt-5">
                <VscError />

                <span>{ cardError }</span>
            </div> }
            { transactionId && <div className="alert-success text-white font-semibold mt-5 flex items-center gap-2 p-2 rounded-md">
                <BsFillCheckCircleFill />
                <p className='flex'>
                    <span>Payment Successfully!. </span>
                    <span>Transaction ID: { transactionId }</span>
                </p>

            </div> }
        </>
    );
};

export default CheckOut;
