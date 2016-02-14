var passport = require('passport')

//plug code into app
module.exports = function(app) {
    
   //use passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    //setup passport- serializeuser -> puts user into a session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    //passport pulls user out of the session with this
    passport.deserializeUser(function(user, done){
        done(null, user);
    });
    
    //use google strategy, and execute it
    require('./strategies/google.strategy')();
    //use twitter strategy, and execute it
    require('./strategies/twitter.strategy')();
    //use facebook strategy, and execute it
    require('./strategies/facebook.strategy')();
    //use github strategy, and execute it
    require('./strategies/github.strategy')();
 
}