const mongoose = require('mongoose');

const { Schema } = mongoose;

const poojaSchema = new Schema({
  title:{type: String, required: false },
  temple:{type: String, required: false },
  type:{type: String, required: false},
  participants_count: { type: Number, default: 0, required: false },
  expected_participants_count: { type: Number, default: 0, required: false },
  status: { type: String, required: false },
  notification_type: { type: String, default: 'Events', required: false },
  startDateTime:{type: Date, required: false },
  endDateTime:{type: Date, required: false }, 
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});

poojaSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'title',
    'temple',
    'participants_count',
    'expected_participants_count',
    'status',
    'notification_type',
    'startDateTime',
    'endDateTime',
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

module.exports = mongoose.model('pooja', poojaSchema);
