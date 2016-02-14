var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

//user
var User = require('../../models/userModel');

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
            
            //find user in our MongoDB, or make a new one
            var query = {
                'github.id': profile.id
            };
            User.findOne(query, function (error, user) {
                if (user) {
                    console.log('found');
                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;
                    
                    user.image = profile.photos[0].value;
                    user.email = profile.emails[0].value;
                    user.displayName = profile.displayName;
                    
                    //add new github object to user
                    user.github = {};
                    user.github.id = profile.id;
                    user.github.token = accessToken;
                    
                    //save
                    user.save();
                    console.log('user: ' + user);
                    done(null, user);
                }
            })

        }
    ));
}