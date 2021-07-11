const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  destination: { type: String, required: false },
  notification_type: { type: String, default: 'Events', required: false },
  type: { type: String, required: false },
  message: { type: String, required: false },
  status: { type: Number, default: 0, required: false },
  participants_count: { type: Number, default: 0, required: false },
  expected_participants_count: { type: Number, default: 0, required: false },
  request_data: { type: Object, default: null },
  created_temple : { type: String, required: false },
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});

eventSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'user_id',
    'destination',
    'notification_type',
    'type',
    'participants_count',
    'expected_participants_count',
    'request_data',
    'created_temple',
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

module.exports = mongoose.model('events', eventSchema);
