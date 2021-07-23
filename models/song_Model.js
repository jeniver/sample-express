const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  album_name: { type: String, required: false },
  song_name: { type: String,  required: false },
  discription: { type: String, required: false },
  created_user: { type: String, required: false },
  image : { type: String, required: false },
  url : { type: String, required: false },
  created: { type: Date, default: Date.now, required: false },
  updated: { type: Date, default: Date.now, required: false },
});



songSchema.methods.transform = function transform() {
  const transformed = {};
  const fields = [
    '_id',
    'user_id',
    'album_name',
    'song_name',
    'discription',
    'created_user',
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
