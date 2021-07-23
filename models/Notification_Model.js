const mongoose = require('mongoose');

const { Schema } = mongoose;

const notificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  destination: { type: String, required: false },
  notification_type: { type: String, default: 'email', required: false },
  type: { type: String, required: false },
  message: { type: String, required: false },
  status: { type: Number, default: 0, required: false },
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});

notificationSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'user_id',
    'destination',
    'notification_type',
    'type',
    'message',
    'status',
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

module.exports = mongoose.model('notifications', notificationSchema);
