const datamongoose = require("../mongoose/productModel");

exports.listmobiles = async(pageNumber, itemPerPage, nameofmobiles) =>{
    const listmobiles = await datamongoose.paginate({name : {$regex: ".*" + nameofmobiles + ".*"}},{
        page: pageNumber,
        limit: itemPerPage,
    });
    return listmobiles;
};

exports.findProduct = async(object) =>{
    const product = await datamongoose.find(object);

    console.log("PRODUCT");
    //console.log(product);
    return product;
};

exports.findOneProduct = async(object) =>{
    const product = await datamongoose.findOne(object);

    console.log("PRODUCT");
    //console.log(product);
    return product;
};