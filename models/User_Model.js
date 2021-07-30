const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  mobile_number:{ type: String, required: [true, 'Mobile is required'] },
  token_data: {
    access_token: { type: String, required: false },
    access_token_exp: { type: Date, required: false},
    refresh_token: { type: String, required: false },
    refresh_token_exp: { type: Date, required: false },
  },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
});

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'name',
    'email',
    'password',
    'mobile_number',
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


module.exports = mongoose.model("User", UserSchema);


