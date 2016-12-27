/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  'user' : function(req, res) {
    if(req.isAuthenticated()) {
      return res.json({ user : req.user })
    } else {
      return res.forbidden()
    }
  },

};

