const ProductServices = require("../services/productService");

const Razorpay=require('razorpay');
const shortid=require('shortid');
const cors=require('cors')

const addProduct = async (req, res, next) => {
  try {
    const {
        userId,
        titel,
        prodtype,
        discription,
        price,
        discount
    } = req.body;
    const files = req.files;
    const data = await ProductServices.addProducts(
        userId,
        titel,
        prodtype,
        discription,
        price,
        discount,
      files
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editProducts = async (req, res, next) => {
    try {
      const {
        productId,
        userId,
        titel,
        prodtype,
        discription,
        price,
        discount
      } = req.body;
      const files = req.files;
      const data = await ProductServices.updateProduct(
        productId,
        userId,
        titel,
        prodtype,
        discription,
        price,
        discount,
        files
      );
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };


  const getProductInfo = async (req, res, next) => {
    try {
      const { productId } = req.query;
      const response = await ProductServices.getProductDetails(productId);
      return res.status(response.status).json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getProducts = async (req, res, next) => {
    try {
      const response = await ProductServices.getAllProducts();
      return res.status(response.status).json(response);
    } catch (error) {
      return next(error);
    }
  };


  const removeProduct = async (req, res, next) => {
    try {
      const { productId } = req.query;
      const response = await ProductServices.deleteProducts(productId);
      return res.status(response.status).json(response);
    } catch (error) {
      return next(error);
    }
  };

  const razorpay=new Razorpay({
    key_id:'rzp_test_3WlZn3KxFyA44t',
    key_secret:'uzetdkRJHPaMPcSfRMu81nIp'
})
  const  razorpay_payment = async (req, res, next) => {
    console.log(123)
    console.log(req.body)
    const amount=req.body.amount;
    const currency=req.body.currency;
    const payment_capture=5;

    const options={
        amount:(amount*100),
        currency:currency,
        receipt:shortid.generate(),
        payment_capture:payment_capture
    }
    try {
      const response=await razorpay.orders.create(options)
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  };


module.exports = {
addProduct,
editProducts,
getProductInfo,
getProducts,
removeProduct,
razorpay_payment
};
