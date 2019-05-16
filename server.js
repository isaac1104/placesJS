const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./models/SavedPlace');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodbURI, { useNewUrlParser: true });

app.use(helmet());
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth_route')(app);
require('./routes/saved_places_route')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
