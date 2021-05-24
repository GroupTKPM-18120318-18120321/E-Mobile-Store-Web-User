const datamongoose = require("./allmobilesModel")


exports.listmobiles = async(pageNumber, itemPerPage, nameofmobiles) =>{
    const listmobiles = await datamongoose.paginate({name : {$regex: ".*" + nameofmobiles + ".*"}},{
        page: pageNumber,
        limit: itemPerPage,
    });
    return listmobiles;
};