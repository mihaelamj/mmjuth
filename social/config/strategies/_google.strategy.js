var passport = require('passport');
//google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//user
var User = require('../../models/userModel');

module .exports = function () {

    //plug it in passport
    passport.use(new GoogleStrategy(
        {
            clientID: '400781816331-3uqib5crvk2adipmjdghdbjb83pepeb3.apps.googleusercontent.com',
            clientSecret: 'bXFOmReIWvJ-EwsiZXLSTffl',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function(req, accessToken, refreshToken, profile, done) {
            
            //find user in our MongoDB, or make a new one
            var query = {
                'google.id': profile.id
            };
            User.findOne(query, function (error, user) {
                if (user) {
                    console.log('found');
                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;

                    user.email = profile.emails[0].value;
                    user.image = profile._json.profile_image_url;
                    if (profile._json.profile_image_url) {
                        user.image = profile._json.profile_image_url;
                    } else if (profile._json.image.url) {
                        user.image = profile._json.image.url;
                    }
                    user.displayName = profile.displayName;

                    user.google = {};
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.strategyName = 'google';
                    user.save();
                    console.log('user: ' + user);
                    done(null, user);
                }
            })

        }
    ));
}