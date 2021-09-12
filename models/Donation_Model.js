const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationSchema = new Schema({
  amount:{ type: Number, required: false },
  full_name: { type: String, required: false },
  address: { type: String, default: 'BR', required: false },
  email_address: { type: String, required: false },
  other_phone: { type: String, required: false },
  payment_referance:{ type: String, required: false },
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});

donationSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'amount',
    'full_name',
    'address',
    'email_address',
    'other_phone',
    'payment_referance',
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

module.exports = mongoose.model('donation', donationSchema);
