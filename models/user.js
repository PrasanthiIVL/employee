var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var Schema = mongoose.Schema;
var userSchema = new Schema({
	email:String,
	password:String
});

var User = mongoose.model('User', userSchema);
module.exports = User;