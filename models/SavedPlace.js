const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedPlaceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  location: Array,
  _user: { type: Schema.Types.ObjectId, ref: 'user' }
});

mongoose.model('SavedPlace', savedPlaceSchema);
