/**
 * Created by Silviu Iulian on 27-Dec-16.
 */

module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    return res.send({
      message : "You must be logged in to access this functionality !"
    })
    return res.redirect('/login');
  }
};
