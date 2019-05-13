const passport = require('passport');

module.exports = app => {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/home');
  });
  app.get('/api/current_user', (req, res) => {
    res.status(200).send(req.user);
  });
  app.get('/api/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
