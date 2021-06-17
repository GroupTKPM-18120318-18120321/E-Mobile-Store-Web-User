const orderModel=require('../mongoose/orderModel');
const orderStatusModel=require('../mongoose/orderStatusModel');

// const getStatus= async(id)=>{
//     return await orderStatusModel.findOne({_id:id});
// }
exports.addOrder = async(object)=>{
    const order =new orderModel(object);
    order.save();

    return order._id;
}

exports.updateOrder = async(query, newObject)=>{
    await orderModel.findOneAndUpdate(query, newObject);
}

exports.getListOrder = async(query)=>{
    const listOrder = await orderModel.find(query).sort({orderDate:-1});
    console.log(listOrder);
    for(let i=0;i<listOrder.length;i++){
        console.log(listOrder[i].orderStatus);
        listOrder[i].status=(await orderStatusModel.findOne({_id:listOrder[i].orderStatus})).statusName;
    }
    console.log(listOrder);
    return listOrder;
}