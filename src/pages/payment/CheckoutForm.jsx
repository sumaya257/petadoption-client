import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../providers/AuthProvider';
import useDonation from '../../hooks/useDonation';
import Swal from 'sweetalert2';

const CheckoutForm = ({ donationAmount, campaignId,petImage,petName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);
    const [donations,refetch]= useDonation()
    

    // Fetch the clientSecret as soon as donationAmount changes
    useEffect(() => {
        if (donationAmount > 0) {
            axiosPrivate
                .post('/create-payment-intent', {
                    amount: Math.round(donationAmount * 100), // Convert to cents
                })
                .then((response) => {
                    setClientSecret(response.data.clientSecret);
                })
                .catch((err) => {
                    console.error('Error creating payment intent:', err);
                    setError('Failed to create payment intent');
                });
        }
    }, [donationAmount, axiosPrivate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (error) {
                console.log('[error]', error);
                setError(error.message);
                return;
            } else {
                setError('');
            }

            // Confirm payment with the paymentIntent clientSecret
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: user?.email || 'anonymous',
                            name: user?.displayName || 'anonymous',
                        },
                    },
                }
            );

            if (confirmError) {
                console.log('Payment confirmation error', confirmError);
                setError(confirmError.message || 'Payment failed');
            } else {
                if (paymentIntent.status === 'succeeded') {
                    setTransactionId(paymentIntent.id); // Save transaction ID
                }
            }
        } catch (err) {
            console.error('Payment submission error:', err);
        }
     // now save the payment in the database
        const payment = {
            userEmail: user.email,
            userName: user.displayName,
            donationAmount: donationAmount,
            transactionId:transactionId,
            date: new Date(), // utc date convert. use moment js to 
            campaignId: campaignId,
            petImage: petImage,
            petName: petName,
        }

        const res = await axiosPrivate.post('/payments', payment);
        console.log('payment saved', res.data);
        refetch();
        if (res.data?.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for the donation",
                showConfirmButton: false,
                timer: 1500
            });
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
            <button className='btn my-2 bg-green-500' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500 font-bold text-xs">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;