var passport = require('passport');
//google strategy
var FacebookStrategy = require('passport-facebook').Strategy;

//user
var User = require('../../models/_userModel');

//util
var util = require('./util.strategy.js');

module .exports = function () {
    
    var updateUser = function(user, id, token) {
        user.facebook = {};
        user.facebook.id = id;
        user.facebook.token = token;
    };

    
    var facebookJSON = util.strategyJSONParams('facebook');
    //plug it in passport
    passport.use(new FacebookStrategy(
        facebookJSON,
        function(req, accessToken, refreshToken, profile, done) {
            
            //init params
            var email = '';
            var displayName = '';
            var image = '';
            var strategyID = ''; 
            var strategyToken = '';
            var strategyTokenSecret = '';
            
            //fetch params
            if (profile.emails) {
                email = profile.emails[0].value;
            };
            displayName = profile.displayName;
            strategyID = profile.id;
            strategyToken = accessToken;
            
            var user = util.findRequestUser(req);
            if (user) {
                
            }
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
                } else if (req.user.github) {
                    query = {
                        'github.id': req.user.github.id
                    };
                } else if(req.user.linkedin) {
                    query = {
                        'linkedin.id': req.user.linkedin.id
                    };
                }
                
                //patch facebook user
                 User.findOne(query, function (error, user) {
                    console.log(error);
                    console.log('user');
                    if (user) {
                        
                        updateUser(user, profile.id, accessToken);

                        user.save();
                        done(null, user);
                    }
                })
                
                
             } else {
                 
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
                            updateUser(user, profile.id, accessToken);
                            
                            user.save();
                            console.log('user: ' + user);
                            done(null, user);
                        }
                    }//

            )
        }//
      }
    ));
}