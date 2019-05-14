const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedPlaceSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  latitude: Number,
  longitude: Number,
  _user: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('SavedPlace', savedPlaceSchema);
