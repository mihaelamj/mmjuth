//user
var User = require('../../models/userModel');

//plug code into req
var handleUserInrReq = function(strategyName, req, strategyCallback) {
    
    var user = null;
    var err =  null;
    
     //if we have a user in req
    if (req.user) { 
        user = req.user;  
    } else {
        //find it in MongoDB
        User.findUserById(user._id, function(aErr, foundUser) {
            err = aErr;
            if (err) {
                user = null;
            } else if (foundUser) {
                user = foundUser;
            } else {
                user = null;
            }
        }
    }
    
    if (user) {
        //fill out the strategy by callback
        strategyCallback(err, user);
        User.save();
    } else {
        err = {err: 'No User'};
    }
};

var updateUser = function(strategyName, user, id, token) {
    user.facebook = {};
    user.facebook.id = id;
    user.facebook.token = token;
};

// var findUser = function(user) {
    
//     User.findUserById(user._id, function(err, user) {
//         if (err) {
//             return null;
//         } else if (user) {
//             return user;
//         } else {
//             return null;
//         }
//     }
// };

module.exports = {
    handleUser: handleUserInrReq
};