var passport = require('passport');
var LinkedinStrategy = require('passport-linkedin').Strategy;

//user
var User = require('../../models/userModel');

module .exports = function () {
    var githubJSON = {
        consumerKey: '77if7hyd6383e4',
        consumerSecret: 'N4iGbeQ7YJc6nDYL',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
    //plug it in passport
    passport.use(new LinkedinStrategy(
        githubJSON,
        function(req, token, tokenSecret, profile, done) {
            
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
                } else if(req.user.github) {
                    query = {
                        'github.id': req.user.github.id
                    };
                }
                
                //patch linkedin user
                 User.findOne(query, function (error, user) {
                    console.log(error);
                    console.log('user');
                    if (user) {
                        //add new linkedin object to user
                        user.linkedin = {};
                        user.linkedin.id = profile.id;
                        user.linkedin.token = tokenSecret;

                        user.save();
                        done(null, user);
                    }
                })                 
                 
                 
             } else {
                //find user in our MongoDB, or make a new one
                var query = {
                    'linkedin.id': profile.id
                };
                User.findOne(query, function (error, user) {
                    if (user) {
                        console.log('found');
                        done(null, user);
                    } else {
                        console.log('not found');
                        var user = new User;
                        
                        user.displayName = profile.displayName;
                        
                        //add new linkedin object to user
                        user.linkedin = {};
                        user.linkedin.id = profile.id;
                        user.linkedin.token = tokenSecret;
                        
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