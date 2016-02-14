var passport = require('passport');
var LinkedinStrategy = require('passport-linkedin').Strategy;

module .exports = function () {
    var githubJSON = {
        consumerKey: '77if7hyd6383e4',
        consumerSecret: 'N4iGbeQ7YJc6nDYL',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
    //plug it in passport
    passport.use(new LinkedinStrategy(
        githubJSON,
        function(token, tokenSecret, profile, done) {
            
            //add user
            var user = {};

            // user.image = profile.photos[0].value;
            // user.email = profile.emails[0].value;
            user.displayName = profile.displayName;
            
            //add new linkedin object to user
            user.linkedin = {};
            user.linkedin.id = profile.id;
            user.linkedin.token = tokenSecret;
            
            done(null, user);
        }
    ));
}