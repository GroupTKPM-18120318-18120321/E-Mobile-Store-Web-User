const mongoose= require('mongoose');
const Schema = mongoose.Schema();

//Tạo model
const orderStatusSchema = mongoose.Schema({
    statusName: {type: String, require: true}
})

module.exports = mongoose.model('OrderStatus', orderStatusSchema, "OrderStatus" )
