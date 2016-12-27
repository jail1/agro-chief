/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('node-bcrypt');

module.exports = {

  attributes: {

    username : {
      type : 'string',
      required : true,
      unique : true,
      minLength : 6
    },
    fullName : {
      type : 'string',
      required : false,
      minLength : 6
    },
    email : {
      type : 'email',
      required : false,
      unique : true
    },
    password : {
      type : 'string',
      minLength : 6,
      required : true
    },
    role : {
      type : 'string',
      enum : ['1', '2', '3'],
      required : false
    },
    farmId : {
      model : 'farms',
      required : false
    },
    toJSON : function() {
      var obj = this.toObject()
      delete obj.password
      return obj
    },
    beforeCreate : function(user, cb) {
      var salt = bcrypt.gensalt();
      var hashedPassword = bcrypt.hashpw(password, salt);
      var checkHashed = bcrypt.checkpw(hashedPassword, user.password);
      if (checkHashed) {
        console.log('bcrypt success', hashedPassword);
        user.password = hashedPassword;
        cb(checkHashed);
      } else {
        console.log('bcrypt fail');
        cb(checkHashed);
      }
    }

  }
};

