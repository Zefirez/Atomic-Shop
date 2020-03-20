import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

import './stripe-button.styles.scss'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_eADZ9ec2176LqCWCU6rAtCjr00hthZc4nB';

    const onToken = token => {
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
        label='Pay Now'
        name='Atomic Shop'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;