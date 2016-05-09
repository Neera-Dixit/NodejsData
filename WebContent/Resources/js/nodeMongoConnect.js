var mongoose = require('mongoose');
var conn=mongoose.connect('mongodb://localhost/showplaces');

if(conn)
console.log("connection To MongoDB established successfully");
else
console.log("connection To MongoDB established failed");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password : String
});


var User = mongoose.model('User', userSchema);// creates collection with name users

module.exports = User;