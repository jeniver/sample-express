const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const templeSchema = new Schema({
  name: { type: String, required: false },
  templeType: { type: String, required: false },
  templeAdmin: { type: String, required: true },
  mainTemple: { type: String, required: false },
  location:{ type: String, required: [true, 'Mobile is required'] },
  mobile_no:{ type: String, required: false },
  description:{type: String, required: false},
  temp_images: [Object],
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
});


templeSchema.plugin(AutoIncrement, { inc_field: 'temp_id' });

templeSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'temp_id',
    'name',
    'templeType',
    'templeAdmin',
    'mainTemple',
    'location',
    'mobile_no',
    'description',    
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


module.exports = mongoose.model("Temple", templeSchema);
