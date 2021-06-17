const detailOrderModel=require('../mongoose/detailOrderModel');

exports.addDetailOrder= async (object)=>{
    const detailOrder = new detailOrderModel({
        idProduct: object._id,
        idOrder: object.idOrder,
        quantity: object.quantity,
        total: object.total,
    })

    detailOrder.save();
}

exports.findDetailOrder= async (query)=>{
    const listDetailOrder = await detailOrderModel.find(query);
    
    return listDetailOrder;
}