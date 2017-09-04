const Authentication = require('./controllers/authentication');
const Dish = require('./controllers/dish');
const User = require('./controllers/user');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // user
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a simple test message' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  // dish
  app.get('/dish/show', requireAuth, Dish.show);
  app.post('/dish/create', requireAuth, Dish.create);
  app.put('/dish/:id', requireAuth, Dish.update);
  app.delete('/dish/:id', requireAuth, Dish.delete);
  app.get('/dish/search/:id', requireAuth, Dish.searchById);
  app.post('/dish/search',Dish.searchByLocation);

  //user
  app.get('/user/:email',requireAuth,User.findByEmail);
  app.get('/user',User.listAll);
  app.post('/user/update',requireAuth,User.updateInfo);
  app.post('/user/favo/update',requireAuth,User.updateFavorite);
};