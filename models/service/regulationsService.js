const parametersModel = require('../mongoose/parameterModel');

exports.getListParameters = async () => {
    return await parametersModel.parameterModel.find();
}