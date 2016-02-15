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
    objectId: {
        type: String, 
        required: true},
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
   strategies: [StrategyModel]
});

module.exports= mongoose.model('User', userModel);