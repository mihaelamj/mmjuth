//user
var User = require('../../models/userModel');

var strategyJSONParams = function(strategyName) {
    
    if (strategyName === 'facebook') {
        return {
            clientID: '1702353246700032',
            clientSecret: '95458f618ba46379e8bd296c0a66c9bd',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            passReqToCallback: true   
        };
    } else if (strategyName === 'twitter') {
        return  {
            consumerKey: 'Vig0oCzmSc63Nm7ipG8XtdDxL',
            consumerSecret: 'TzJBNfXL5UzbOhLITHd0fg5l4Y9AbMHZUhIgh7EbEEE2YlfpZV',
            callbackURL: 'http://localhost:3000/auth/twitter/callback',
            passReqToCallback: true    
        };        
    } else if (strategyName === 'linkedin') {
        return {
            consumerKey: '77if7hyd6383e4',
            consumerSecret: 'N4iGbeQ7YJc6nDYL',
            callbackURL: 'http://localhost:3000/auth/linkedin/callback',
            passReqToCallback: true,
            profileFields: ['id', 'first-name', 'last-name', 'email-address', 'picture-url']  
        };       
    } else if (strategyName === 'google') {
        return {
            clientID: '400781816331-3uqib5crvk2adipmjdghdbjb83pepeb3.apps.googleusercontent.com',
            clientSecret: 'bXFOmReIWvJ-EwsiZXLSTffl',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true 
        };        
    } else if (strategyName === 'github') {
        return {
            clientID: 'eb52784da6a2dca841e2',
            clientSecret: '90b50792b4b56f7f0ff5b224880782226465484a',
            callbackURL: 'http://localhost:3000/auth/github/callback',
            passReqToCallback: true   
        } ;       
    }
    return null;
}

var updateUserAndStrategy = function(user, strategyName, strategyID, strategyToken, strategyTokenSecret, displayName, email, image) {
    
    //user
    user.displayName = displayName;
    user.image = image;
    user.email = email;
    
    //strategies
    if (strategyName === 'facebook') {
        user.facebook = {};
        user.facebook.id = strategyID;
        user.facebook.token = strategyToken;
        user.facebook.tokenSecret = strategyTokenSecret;
        user.facebook.displayName = displayName;
    } else if (strategyName === 'twitter') {
        user.twitter = {};
        user.twitter.id = strategyID;
        user.twitter.token = strategyToken;
        user.twitter.tokenSecret = strategyTokenSecret;
        user.twitter.displayName = displayName;
    } else if (strategyName === 'linkedin') {
        user.linkedin = {};
        user.linkedin.id = strategyID;
        user.linkedin.token = strategyToken;
        user.linkedin.tokenSecret = strategyTokenSecret;
        user.linkedin.displayName = displayName;
    } else if (strategyName === 'google') {
        user.google = {};
        user.google.id = strategyID;
        user.google.token = strategyToken;
        user.google.tokenSecret = strategyTokenSecret;
        user.google.displayName = displayName;
    } else if (strategyName === 'github') {
        user.github = {};
        user.github.id = strategyID;
        user.github.token = strategyToken;
        user.github.tokenSecret = strategyTokenSecret;
        user.github.displayName = displayName;
    }
};

var findRequestUser = function(req) {
    if (req.user) {
        //find it in Mongo
       User.findUserById(req.user._id, function(err, user) {
           if (err) {
               return null;
           } else if (user) {
               return user;
           } else {
               return null;
           }
       }  
    } 
};

module.exports = {
    strategyJSONParams: strategyJSONParams,
    updateUserAndStrategy: updateUserAndStrategy,
    findRequestUser : findRequestUser
};