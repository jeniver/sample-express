const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const productSchema = new Schema({
  prod_id:{type:Number , default:null},
  // user_id: { type: Schema.Types.ObjectId, required: false },
  name:{ type: String, required: false },
  productType: { type: String, default: 'BR', required: false },
  currencyType:{ type: String,  required: false },
  price : { type: Number,  required: false },
  discountType:{ type: String, required: false },
  discountAmount:{ type: Number, required: false },
  description: { type: String, required: false },
  prod_images: [Object],
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});


productSchema.plugin(AutoIncrement, { inc_field: 'prod_id' });

productSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'prod_id',
    'user_id',
    'titel',
    'prod_type',
    'discription',
    'discount',
    'price',
    'prod_images',
    'created',
    'updated',
  ];
  fields.forEach((field) => {
    if (field in this) {
      transformed[field] = this[field];
    }
  });

  return transformed;
};

module.exports = mongoose.model('product', productSchema);
