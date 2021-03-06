const mongoose = require('mongoose');
const SavedPlace = mongoose.model('SavedPlace');
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
  app.get('/api/saved_places', requireAuth, async (req, res) => {
    const savedPlaces = await SavedPlace.find({ _user: req.user.id });
    res.status(200).send(savedPlaces);
  });

  app.get('/api/saved_places/:uuid', requireAuth, async (req, res) => {
    const { uuid } = req.params;
    try {
      const savedPlace = await SavedPlace.findOne({ uuid });
      res.status(200).send(savedPlace);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.post('/api/saved_places', requireAuth, async (req, res) => {
    const { title, description, latitude, longitude, uuid } = req.body;
    const currentPlace = await SavedPlace.find({ latitude, latitude });
    if (currentPlace.length !== 0) {
      return;
    }
    const savedPlace = new SavedPlace({
      title,
      description,
      latitude,
      longitude,
      uuid,
      _user: req.user.id
    });
    try {
      await savedPlace.save();
      res.status(200).send(savedPlace);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete('/api/saved_places', requireAuth, async (req, res) => {
    const { uuid } = req.query;
    try {
      await SavedPlace.deleteOne({ uuid });
      res.sendStatus(200);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
