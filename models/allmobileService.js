const datamongoose = require("./allmobilesModel")


exports.listmobiles = async(pageNumber, itemPerPage) =>{
    const listmobiles = await datamongoose.paginate({},{
        page: pageNumber,
        limit: itemPerPage,
    });
    return listmobiles;
};