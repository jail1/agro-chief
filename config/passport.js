/**
 * Created by Silviu Iulian on 27-Dec-16.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('node-bcrypt')

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findOne({ id : id }, function(err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password'
}, function(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    var checkedPassword = bcrypt.checkpw(password, user.password)

    if(checkedPassword) {
      return done(null, false, {
        message: 'Invalid Password'
      });
    } else {
      var returnUser = {
        username : user.username,
        createdAt: user.createdAt,
        id: user.id
      };
      return done(null, returnUser, {
        message: 'Logged In Successfully'
      })
    }
  })
}))
