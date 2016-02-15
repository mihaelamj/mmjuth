var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

//user
var User = require('../../models/userModel');

module .exports = function () {
    
    //make JSON
    var githubJSON = {
        clientID: 'eb52784da6a2dca841e2',
        clientSecret: '90b50792b4b56f7f0ff5b224880782226465484a',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }
    
    //plug it in passport
    passport.use(new GithubStrategy(
        githubJSON,
        function(req, accessToken, refreshToken, profile, done) {
            
            //if we have a user in req
             if (req.user) {
                 
                //find user
                var query = {};
                
                if (req.user.google) {
                    query = {
                        'google.id': req.user.google.id
                    };
                } else if(req.user.twitter) {
                    query = {
                        'twitter.id': req.user.twitter.id
                    };
                } else if (req.user.facebook) {
                    query = {
                        'facebook.id': req.user.facebook.id
                    };
                } else if(req.user.linkedin) {
                    query = {
                        'linkedin.id': req.user.linkedin.id
                    };
                }
                
                //patch github user
                 User.findOne(query, function (error, user) {
                    console.log(error);
                    console.log('user');
                    if (user) {
                        //add new github object to user
                        user.github = {};
                        user.github.id = profile.id;
                        user.github.token = accessToken;

                        user.save();
                        done(null, user);
                    }
                })                 
                 
                 
             } else {
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

        }
    ));
}