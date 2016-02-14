var express = require('express');
var passport = require('passport');
var router = express.Router();

//Google
router.route('/google/callback')
    .get(passport.authenticate('google', 
            { 
                successRedirect: '/users/',
                failure: '/error/'
            }
        )
     );
     
router.route('/google')
    .get(passport.authenticate('google', 
            {   //scope is specific to Google, what info we want provided
                scope: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                    ]
            }
        )
    );
    
//Twitter
router.route('/twitter/callback')
    .get(passport.authenticate('twitter', 
            { 
                successRedirect: '/users/',
                failure: '/error/'
            }
        )
     );
     
router.route('/twitter')
    .get(passport.authenticate('twitter'));
    
//Facebook
router.route('/facebook/callback')
    .get(passport.authenticate('facebook', 
            { 
                successRedirect: '/users/',
                failure: '/error/'
            }
        )
     );
     
router.route('/facebook')
    .get(passport.authenticate('facebook', 
            {   //scope is specific to Facebook as well, what info we want provided
                scope: [
                    'email',
                    'user_friends'
                    ]
            }
        )
    );
    
//Github
router.route('/github/callback')
    .get(passport.authenticate('github', 
            { 
                successRedirect: '/users/',
                failure: '/error/'
            }
        )
     );
     
router.route('/github')
    .get(passport.authenticate('github'));
    
module.exports = router;

