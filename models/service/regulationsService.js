const parametersModel = require('../mongoose/parameterModel');

exports.getListParameters = async () => {
    return await parametersModel.parameterModel.find();
}

exports.getDeliveryCharge = async() => {
    let deliveryCharge = "0";
    const result = await parametersModel.parameterModel.findById("60c4dc138883d632fcc11a09");

    if (result.state){
        deliveryCharge = result.fvalue;
    }
    
    return deliveryCharge;
}