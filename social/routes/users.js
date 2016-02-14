var express = require('express');
var router = express.Router();

//add security to this route, do not allow to access this page if user is not logged in
router.use('/', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.send('respond with a resource')\
    //passport added user object to req, so we have req.user available
    //but it is messy google user object, let's clean it up
    // var cleanUser = {
    //     name: req.user.displayName,
    //     image: req.user._json.image.url
    // }
    var cleanUser = {
        name: req.user.displayName,
        image: req.user.image
    }
    res.render('users', {user : cleanUser});
});

module.exports = router;
