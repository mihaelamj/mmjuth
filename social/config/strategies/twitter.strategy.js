var passport = require('passport');
//google strategy
var TwitterStrategy = require('passport-twitter').Strategy;

//user
var User = require('../../models/userModel');

module .exports = function () {

    var twitterJSON = {
        consumerKey: 'Vig0oCzmSc63Nm7ipG8XtdDxL',
        consumerSecret: 'TzJBNfXL5UzbOhLITHd0fg5l4Y9AbMHZUhIgh7EbEEE2YlfpZV',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true   
    }
    //plug it in passport
    passport.use(new TwitterStrategy(
        twitterJSON,
        function(req, token, tokenSecret, profile, done) {
            
            //if we have a user in req
             if (req.user) {
                 
                //find user
                var query = {};
                
                //query strategies
                if (req.user.google) {
                    query = {
                        'google.id': req.user.google.id
                    };
                } else if(req.user.facebook) {
                    query = {
                        'facebook.id': req.user.facebook.id
                    };
                } else if (req.user.github) {
                    query = {
                        'github.id': req.user.github.id
                    };
                } else if(req.user.linkedin) {
                    query = {
                        'linkedin.id': req.user.linkedin.id
                    };
                }
                
                //patch the twitter user
                 User.findOne(query, function (error, user) {
                    console.log(error);
                    console.log('user');
                    if (user) {
                        user.twitter = {};
                        user.twitter.id = profile.id;
                        user.twitter.token = token;
                        user.twitter.tokenSecret = tokenSecret;
                        user.save();
                        done(null, user);
                    }
                })
                
             } else {
                //else find user in our MongoDB, or make a new one
                var query = {
                    'twitter.id': profile.id
                };
                User.findOne(query, function (error, user) {
                    if (user) {
                        console.log('found');
                        done(null, user);
                    } else {
                        console.log('not found');
                        var user = new User;
                        
                        user.image = profile._json.profile_image_url;
                        user.displayName = profile.displayName;
                        
                        //add new twitter object to user
                        user.twitter = {};
                        user.twitter.id = profile.id;
                        user.twitter.token = token;
                        user.twitter.tokenSecret = tokenSecret;
                         
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