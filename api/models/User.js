/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        email: {
            type: 'email',
            required: true
        },
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        }
    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    },
    beforeCreate: function(user, cb) {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                console.log(err);
                cb(err);
            } else {
                user.password = hash;
                cb(null, hash);
            }
        })
    }


};
