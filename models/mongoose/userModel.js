const mongoose= require('mongoose');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const userSchema = mongoose.Schema({
    name: {type: String, require: true},//Tên đăng nhập
    userName: {type: String, require: true},//Họ tên
    password: {type: String, require: true},
    email: {type: String, require: true},
    phoneNumber: {type: String, require: true},  
    avatar: {type: String},

    street: {type: String},
    subDistrict: {type:String},
    district: {type: String},
    city:{type: String},
    address: {type: String, require: true},
    accountState:{type: Number,  enum: [0,1], default: 0,},
    id : {type: String, require: true},
    token : {type: String, require: true},
    role: {type: mongoose.Schema.Types.ObjectId , require: true},
    DoB:  {type: String, require: true},
    gender: {type: String, enum: ["nam","nữ"], require: true},
})

// userSchema.virtual('address').get(function() {
//     return `${this.street}, ${this.subDistrict}, ${this.district}, ${this.city}`; 
// });

module.exports = mongoose.model('users', userSchema )