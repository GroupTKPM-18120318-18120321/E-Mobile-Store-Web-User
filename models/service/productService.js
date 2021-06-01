const datamongoose = require("../mongoose/productModel");

const changeIdManufacturer= async()=>{
    const products=await datamongoose.find();
    let idmanufacturer;
    var iphone=/ipho/i;
    var samsung=/sam/i;
    var huawei=/hua/i;
    var xiaomi=/xiao/i;
    var oppo=/oppo/i;
    var vivo=/vivo/i;
    var itel=/itel/i;
    var vsmart=/vsmar/i;
    var realme=/real/i;
    for(let i of products){ 
        
        if(iphone.test(i.name)){
            idmanufacturer="5fefd77974c412a9040fdb26";
        }
        else if(samsung.test(i.name)){
            idmanufacturer="5fefd79774c412a9040fdb27";
        }
        else if(xiaomi.test(i.name)){
            idmanufacturer="5fefd7ad74c412a9040fdb28";
        }
        else if(huawei.test(i.name)){
            idmanufacturer="5fefd7ba74c412a9040fdb29";
        }
        else if(oppo.test(i.name)){
            idmanufacturer="5fefd7c774c412a9040fdb2a";
        }
        else if(vivo.test(i.name)){
            idmanufacturer="5fefd7c774c412a9040fdb2b";
        }
        else if(itel.test(i.name)){
            idmanufacturer="5fefd7e274c412a9040fdb2c";
        }
        else if(vsmart.test(i.name)){
            idmanufacturer="5fefd7f774c412a9040fdb2d";
        }
        else if(realme.test(i.name)){
            idmanufacturer="5fefd80b74c412a9040fdb2e";
        }
        //console.log(idmanufacturer);
        await datamongoose.findOneAndUpdate(
            {_id: i._id},
            {     
                idmanufacturer:idmanufacturer,
            }
        );
    }
}

exports.listmobiles = async(pageNumber, itemPerPage, filter,sort) =>{
    // let money;
    // let randomNum;
    // const products=await datamongoose.find();
    // for(let i of products){
    //     randomNum = Math.floor((Math.random() * 60) + 1);
    //     money= randomNum * 500000;
    //     await datamongoose.findOneAndUpdate(
    //         {_id: i._id},
    //         {     
    //             baseprice: money,
    //             discountprice: money-Math.ceil(money*10/100),
    //             // quantitySold: randomNum*2,
    //             // price: money-Math.ceil(money*10/100),
    //         }
    //     );
                
    //     //Khơi tao cac gia tri khong co sẵn 
    //     // if(i.quantityAvailable==undefined){
    //     //     await datamongoose.findOneAndUpdate(
    //     //         {_id: i._id},
    //     //         {     
    //     //             quantityAvailable: 1000,
    //     //             description: "Lorem ipsum dolor sit amet, consectetur",
    //     //             releaseDay: Date.now(),
    //     //             reviewNum: 0,
    //     //             trackNum: 0,
    //     //             DeletedState: 0,
    //     //         }
    //     //     );
    //     // }
    //}
    //Khoi tao lại giá trị id nhà sx
    //changeIdManufacturer();

    const option={
        offset: (pageNumber-1)*itemPerPage,
        limit: itemPerPage,
        sort: sort,
        lean: true,
    }
    const listmobiles = await datamongoose.paginate(filter,option);
    return listmobiles;
};

exports.findProduct = async(object) =>{
    const product = await datamongoose.find(object);

    //console.log(product);
    return product;
};

exports.findOneProduct = async(object) =>{
    const product = await datamongoose.findOne(object).lean();
    //console.log(product);
    return product;
};

exports.findNewProduct = async(numProduct)=>{
    const sort={
        releaseDay: -1,
    };
    const product=await datamongoose.find().limit(numProduct).sort(sort);
    return product;
}
exports.findHighlightsProduct = async(numProduct)=>{
    const sort={
        releaseDay: -1,
        quantitySold: -1,
    };
    const product=await datamongoose.find().limit(numProduct).sort(sort);
    return product;
}

exports.findSimilarProduct = async(filter) => {
    const diff=1000000;
    const product=await datamongoose.findOne(filter);
    const similarProduct = await datamongoose.find({ 
                                            _id:{$ne:product._id},
                                            $or:[{'idmanufacturer': product.idmanufacturer},
                                                {'discountprice': { $gte: product.discountprice - diff, $lte: product.discountprice +diff},
                                            }]
                                        }).
                                        limit(4);
    return similarProduct;                                    
}