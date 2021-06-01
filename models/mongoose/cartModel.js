const mongoose= require('mongoose');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const cartSchema = mongoose.Schema({
    idSession: String,
    listProduct: {type:Object},
})

module.exports = mongoose.model('Cart', cartSchema, "Cart" )