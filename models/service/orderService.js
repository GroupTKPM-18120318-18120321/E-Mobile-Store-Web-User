const orderModel=require('../mongoose/orderModel');

exports.addOrder = async(object)=>{
    const order =new orderModel({
        orderDate: Date.now(),
        street: object.street,
        subDistrict: object.subDistrict,
        district: object.district,
        city: object.city,

        paymentMethod: object.paymentMethod,
        //orderStatus: Để mặc định là chưa giao
        idCustomer: object.idCustomer,
        phone: object.phoneNumber,
        total: object.total,
    });
    order.save();
}
