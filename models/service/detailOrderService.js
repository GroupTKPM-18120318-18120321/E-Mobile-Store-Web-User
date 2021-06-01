const detailOrderModel=require('../mongoose/detailOrderModel');

exports.addDetailOrder= async (object)=>{
    const detailOrder = new detailOrderModel({
        idProduct: object.idProduct,
        idOrder: obect.idOrder,
        quantity: object.quantity,
        total: object.total,
    })

    detailOrder.save();
}