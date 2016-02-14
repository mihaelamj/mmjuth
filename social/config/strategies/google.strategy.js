var passport = require('passport');
//google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module .exports = function () {

    //plug it in passport
    passport.use(new GoogleStrategy(
        {
            clientID: '400781816331-3uqib5crvk2adipmjdghdbjb83pepeb3.apps.googleusercontent.com',
            clientSecret: 'bXFOmReIWvJ-EwsiZXLSTffl',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function(req, accessToken, refreshToken, profile, done) {
            //add user
            var user = {};
            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;
            //add new google object to user
            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;
            
            done(null, user);
        }
    ));
}