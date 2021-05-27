const mongoose= require('mongoose');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},  
    avatar: {type: String},
    id : {type: String, require: true},
    token : {type: String, require: true}
})



module.exports = mongoose.model('users', userSchema )