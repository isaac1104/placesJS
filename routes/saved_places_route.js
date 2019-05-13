const mongoose = require('mongoose');
const SavedPlace = mongoose.model('SavedPlace');

module.exports = app => {
  app.get('/api/saved_places', async (req, res) => {
    const savedPlace = await SavedPlace.find({ _user: req.user.id });
    res.status(200).send(savedPlace);
  });

  app.post('/api/saved_places', async (req, res) => {
    console.log(req.body);
  )};
};
