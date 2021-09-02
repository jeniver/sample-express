const Razorpay=require('razorpay');
const shortid=require('shortid')

const razorpay=new Razorpay({
    key_id:'rzp_test_3WlZn3KxFyA44t',
    key_secret:'uzetdkRJHPaMPcSfRMu81nIp'
})
const  razorpay_payment = async (req, res, next) => {
    console.log(123)
    const amount=5;
    const currency='USD';
    const payment_capture=5;

    const options={
        amount:(amount*100),
        currency:currency,
        receipt:shortid.generate(),
        payment_capture:payment_capture
    }

    const response=await razorpay.orders.create(options)
    console.log(response)    
  };

module.exports = {
    razorpay_payment
  };

