const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotelSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: false },
  titel:{ type: String, required: false },
  room: { type: String, required: false },
  room_type: { type: String, default: 'BR', required: false },
  room_images: [Object],
  discription: { type: String, required: false },
  discount:{ type: String, required: false },
  price : { type: String,  required: false },
  person_count: { type: Number, default: 0, required: false },
  facility_list: { type: Array},
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});

hotelSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'user_id',
    'room_type',
    'room_images',
    'discription',
    'discount',
    'price',
    'person_count',
    'facility_list',
    'created_temple',
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

module.exports = mongoose.model('hotel', hotelSchema);
