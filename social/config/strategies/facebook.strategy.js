var passport = require('passport');
//google strategy
var FacebookStrategy = require('passport-facebook').Strategy;

module .exports = function () {

    var facebookJSON = {
        clientID: '1702353246700032',
        clientSecret: '95458f618ba46379e8bd296c0a66c9bd',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true   
    }
    //plug it in passport
    passport.use(new FacebookStrategy(
        facebookJSON,
        function(req, accessToken, refreshToken, profile, done) {
            
            //add user
            var user = {};
            if (profile.emails) {
                user.email = profile.emails[0].value;
            }
            
            // user.image = profile._json.image.url;
            user.displayName = profile.displayName;
            
            //add new facebook object to user
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            
            done(null, user);
        }
    ));
}