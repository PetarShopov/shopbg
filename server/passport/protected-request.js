const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('mongoose').model('User')

module.exports = new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 's0m3 r4nd0m str1ng'
    },
    function (jwtPayload, done) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.find({ '_id': jwtPayload.sub })
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
);