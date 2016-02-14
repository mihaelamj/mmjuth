var passport = require('passport');
//google strategy
var FacebookStrategy = require('passport-facebook').Strategy;

//user
var User = require('../../models/userModel');

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
           
           //find user in our MongoDB, or make a new one 
           var query = {
                'facebook.id': profile.id
            };
            
           User.findOne(query, function (error, user) {
                if (user) {
                    console.log('found');
                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;

                    if (profile.emails) {
                        user.email = profile.emails[0].value;
                    };
                    user.displayName = profile.displayName;

                    //add new facebook object to user
                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    
                    user.save();
                    console.log('user: ' + user);
                    done(null, user);
                }
            })
        }
    ));
}