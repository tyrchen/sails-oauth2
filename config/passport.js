var passport = require('passport'),
    bcrypt = require('bcrypt'),
    localStrategy = require('passport-local').Strategy,
    bearerStrategy = require('passport-http-bearer').Strategy;

function _find(query, cb) {
    User.findOne(query).done(function(err, user) {
        if (err) {
            return cb(null, null);
        } else {
            return cb(null, user);
        }
    });
}

function find_by_id(id, cb) { _find(id, cb); }
function find_by_username(username, cb) { _find({username: username}, cb); }

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    find_by_id(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy(function(username, password, done) {
    process.nextTick(function() {
        find_by_username(username, function(err, user) {
            if (err) return done(null, err);
            if (!user) return done(null, false, {message: 'Unknown user' + username});

            bcrypt.compare(password, user.password, function(err, res) {
                if (!res) return done(null, false, {message: 'Invalid password'});
                return done(null, user, {message: 'logged in successfully'});
            })
        })
    })
}));




module.exports = {
    express: {
        customMiddleware: function(app) {
            console.log('Express midleware for passport');
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
}
