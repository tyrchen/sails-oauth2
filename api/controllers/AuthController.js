/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
module.exports = {
    login: function(req, res) {
        res.view();
    },
    process: function(req, res) {
        passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'})(req, res);
    },
    logout: function(req, res) {
        req.logOut();
        res.send({
            message: 'logout successfully'
        });
    },
    blueprints: {
        actions: true,
        rest: true,
        shortcuts: false
    },

    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to AuthController)
    */
    _config: {}

  
};
