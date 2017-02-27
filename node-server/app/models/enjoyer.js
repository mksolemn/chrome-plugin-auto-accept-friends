var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnjoyerSchema = new Schema({
    nameId: String,
    userImage: String,
    username: String,
    password: String,
    inviteTime: Number,
    lastLogin: Number,
    userState: Number,   // 1 - registered (has password and username) // 2 - registered (has all information)
    friendStats: [{totalFriends: Number, totalInvites:Number, date: String}]
                        

});

module.exports = mongoose.model('Enjoyer', EnjoyerSchema);