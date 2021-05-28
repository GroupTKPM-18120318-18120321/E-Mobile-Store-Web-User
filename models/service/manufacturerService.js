const manufacturerModel=require('../mongoose/manufacturerModel');

exports.findOne = async(filter) =>{
    const manufacturer= await manufacturerModel.findOne(filter);
    return manufacturer;
}