//grab mongoose module

var mongoose = require('mongoose');

//Define Trains Model
// Set module exports to allow passing files between throughout app
var trainSchema = new mongoose.Schema({
    TRAIN_LINE: {
        type: String,
        required: true
    },
     ROUTE_NAME: {
        type: String,
        required: true
    },
     RUN_NUMBER: {
        type: String,
        required: true
    },
     OPERATOR_ID: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('train', trainSchema);