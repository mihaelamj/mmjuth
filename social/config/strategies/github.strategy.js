var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

module .exports = function () {
    var githubJSON = {
        clientID: 'eb52784da6a2dca841e2',
        clientSecret: '90b50792b4b56f7f0ff5b224880782226465484a',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }
    //plug it in passport
    passport.use(new GithubStrategy(
        githubJSON,
        function(accessToken, refreshToken, profile, done) {
            
            //add user
            var user = {};

            user.image = profile.photos[0].value;
            user.email = profile.emails[0].value;
            user.displayName = profile.displayName;
            
            //add new github object to user
            user.github = {};
            user.github.id = profile.id;
            user.github.token = accessToken;
            
            done(null, user);
        }
    ));
}