var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SystemSchema = new Schema({
    nameId: String,

});

module.exports = mongoose.model('System', SystemSchema);