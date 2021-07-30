const ProductServices = require("../services/productService");

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



module.exports = {
addProduct,
editProducts,
getProductInfo,
getProducts,
removeProduct
};
