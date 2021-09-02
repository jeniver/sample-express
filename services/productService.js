
const moment = require("moment");
const ProductModel = require('../models/Product_Models')
const Razorpay=require('razorpay');
const shortid=require('shortid')
const {Ok , ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')
const formatError = (error) => {
    if (!error) return ServerError("Unknown error", error)
    const { statusCode } = error
    switch 
    (statusCode) {
        case 400:
            return BadRequest(error)
        case 401:
            return Unauthorised(error)
        case 403:
            return Forbidden(error)
        case 404:
            return NotFound(error)
        default:
            return ServerError(error)
    }

}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


 const addProducts = async (
    userId,
    titel,
    prodtype,
    discription,
    price,
    discount,
    files
  ) => {
    let session = null;
    try {
        let filesArray = [];
        files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const products = await new ProductModel({
            user_id : userId ,
            titel:titel,
            prod_type:prodtype,
            prod_images:filesArray,
            discription:discription,
            price:price,
            discount:discount


          });
      const createdProducts = await products.save();
      if (createdProducts) {
        return  await Ok("Product Created Sussesfully",createdProducts);
      }
       
    } catch (error) {
        console.log(error)
      return await formatError(error)
    } 
  };


  const updateProduct = async (
    productId,
    userId,
    titel,
    prodtype,
    discription,
    price,
    discount,
    files  ) => {
    let session = null;
    try {
        let filesArray = [];
        files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
      const product = await ProductModel.findOneAndUpdate(
        { _id: productId },
        {
            user_id : userId ,
            titel:titel,
            prod_type:prodtype,
            prod_images:filesArray,
            discription:discription,
            price:price,
            discount:discount
      });
      if (product) {
        return  await Ok("Product Update Sussesfully",product);
      }    
    } catch (error) {
        console.log("test" , error)
      return await formatError(error)
    } 
  };

  const getAllProducts = async () => {
    try {
      const products = await ProductModel.find();
      return await Ok("Product list",products);;
    } catch (error) {
      return console.log(error)
    }
  };

  const getProductDetails = async (productId) => {
    try {
        const getProduct = await ProductModel.findOne({ _id: productId }).lean() ; 
        if (getProduct) {
          return Ok("get Product Info",getProduct);    ;
        }
       
      } catch (error) {
        console.log(error)
        
      }
  };



  const deleteProducts = async (productId) => {
    try {
        const removeProduct = await ProductModel.findOneAndDelete({ _id: productId });
        if (removeProduct) {
          return Ok("Remved  Product Info",removeProduct);    ;
        }
       
      } catch (error) {
        console.log(error)
        
      }
  }

  const razorpay=new Razorpay({
    key_id:'rzp_test_3WlZn3KxFyA44t',
    key_secret:'uzetdkRJHPaMPcSfRMu81nIp'
})




module.exports = {
addProducts, 
updateProduct,
getAllProducts,
getProductDetails,
deleteProducts,
};

  