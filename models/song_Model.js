const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  album_name: { type: String, required: false },
  song_name: { type: String,  required: false },
  singer: { type: String, required: false },
  image : { type: String, required: false },
  url : { type: String, required: false },
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});



songSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'album_name',
    'song_name',
    'singer',
    'image' ,
    'url' ,
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

module.exports = mongoose.model('songs', songSchema);
