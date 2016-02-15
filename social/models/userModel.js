var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    displayName: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    facebook: {
        type: Object
    },
    github: {
        type: Object
    },
    google: {
        type: Object
    },
    linkedin: {
        type: Object
    },
    twitter: {
        type: Object
    }
});

module.exports= mongoose.model('User', userModel);