var express = require('express');
var router = express.Router();

const authController = require('./authController');
const passport = require('../../auth/passport');

router.get('/auth', authController.showAuthLayout);
router.get('/auth/:authId', authController.showRegisterLayout);
router.post('/auth', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/auth?wrongPassword'}), authController.signIn);
router.post('/auth/:authId', authController.Register);

router.get('/logout', authController.logout);

module.exports = router;