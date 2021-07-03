const orderModel=require('../mongoose/orderModel');
const orderStatusModel=require('../mongoose/orderStatusModel');
const regulationsService = require('./regulationsService');

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

exports.calcDeliveryCharge = async (totalPrice) => {
    let deliveryCharge = 0;
    let deliveryChargeParameter;
    let totalParameter;
    const listParameters = await regulationsService.getListParameters();

    for (let i = 0; i < listParameters.length; i++) {
        if (listParameters[i].id === "60c4d6752c9a202c887e3adb") {
            deliveryChargeParameter = listParameters[i];
        } else if (listParameters[i].id === "60c4dc138883d632fcc11a09") {
            totalParameter = listParameters[i];
        } else {
            continue;
        }
    }

    if (deliveryChargeParameter.state){
        if (totalParameter.state){
            if (totalPrice < Number(totalParameter.value)){
                deliveryCharge = Number(deliveryChargeParameter.value);
            }
        } else {
            deliveryCharge = Number(deliveryChargeParameter.value);
        }
    }

    return deliveryCharge;
}

exports.calcDeliveryDate = async (nowDate) => {
    let deliveryDate = nowDate;
    const listParameters = await regulationsService.getListParameters();

    for (let i = 0; i < listParameters.length; i++) {
        if (listParameters[i].id === "60c4dbe28883d632fcc11a08") {
            if (listParameters[i].state){
                const time = nowDate.getTime() + (listParameters[i].value) * 24 * 60 * 60 * 1000;
                deliveryDate = new Date(time);
            }
        }
    }

    return deliveryDate;
}