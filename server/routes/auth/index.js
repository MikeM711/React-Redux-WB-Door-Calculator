const passport = require('passport');
const router = require('express-promise-router')();

const passportConf = require('../../config/passport/passport')
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const { passportSignIn } = require('../../helpers/passportHelpers');
const UsersController = require('../../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

// below googleToken is deprecated
// router.route('/oauth/google')
//   .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

// deleted: { session: false } 
router.route('/oauth/google')
  .get(passport.authenticate('google', { scope: ['profile'] }), UsersController.googleOAuth);

router.route('/auth/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      console.log('inside /auth/google/callback')
      // Successful authentication, redirect home.
      res.redirect('/');
    });

router.route('/profile')
  .get(passport.authenticate('jwt', { session: false }), UsersController.profile);

router.route('/userwidgetcalculation')
  .post(passport.authenticate('jwt', { session: false }), UsersController.userWgtCalc);

router.route('/deletewidgetcalculation/:id')
  .delete(passport.authenticate('jwt', { session: false }), UsersController.deleteWgtCalc);

module.exports = router;