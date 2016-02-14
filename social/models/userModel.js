var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StrategyModel = new Schema({
    strategyName: {
        type: String
    }, 
    id: {
        type: String
    },
    token: {
        type: String
    },
    tokenSecret: {
        type: String
    },
       
});

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
    //Strategies
    // facebook: {
    //     type: StrategyModel
    // },
    // github: {
    //     type: StrategyModel
    // },
    // google: {
    //     type: StrategyModel
    // },
    // linkedin: {
    //     type: StrategyModel
    // },
    // twitter: {
    //     type: StrategyModel
    // }
    //Strategies
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