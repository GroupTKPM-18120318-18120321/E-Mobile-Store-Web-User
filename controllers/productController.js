const productService = require('../models/service/productService');
const manufacturerService =require('../models/service/manufacturerService'); 
const commentService = require('../models/service/commentService');
const datamongoose = require("../models/mongoose/productModel");
const manufacturerModel = require("../models/mongoose/manufacturerModel");
const { ObjectId } = require('mongodb');

exports.product = async(req, res, next) => {
    //Lấy dữ liệu 
    const product = await productService.findProduct();

    //console.log(product);
    console.log("req.protocol");
    console.log(req.get('Host'));
    console.log(req.protocol);
    res.render('home/index', {product, isLogin: false, display: true, register: true});

};

function addParameterToURL(url, param, value){
    const position=url.search(param);
    if(position!=-1) url = url.slice(0,position) + param + "=" +value;
    else url += (url.split('?')[1] ? '&':'?') + param + "=" +value;
    return url;
}

exports.brands = async (req, res, next) => {
    const page= +req.query.page || 1;
    if(page<0) page=1;

    const limit = 9;
    // const offset =(page -1)*limit;

    
    const nameManufacturer=req.params.nameManufacturer;
    const nameProduct=req.query.nameProduct;
    const searchValue=nameProduct;
    const sortValue=req.query.sort;

    const filter={};
    if( nameProduct != undefined){
        filter.name = new RegExp(nameProduct,"i");
    }
    if(nameManufacturer !=undefined && nameManufacturer!="all"){
        const manufacturer= await manufacturerService.findOne({manufacturer: nameManufacturer});
        console.log(manufacturer);
        filter.idmanufacturer = manufacturer=== null ? undefined : manufacturer._id;
    }

    const sort={};
    if(sortValue==1) sort.baseprice=-1;
    else if(sortValue==2) sort.baseprice=1;
    else if(sortValue==3) sort.releaseDay=-1;
    else if(sortValue==4) sort.quantitySold=-1;

    const allmobiles = await productService.listmobiles(page, limit, filter,sort);

    const pageItem=[];
    let start=1;
    if(allmobiles.totalPages>=5 && page>=allmobiles.totalPages-1)
        start=allmobiles.totalPages-4;
    else if(page>2) 
        start=page-2;

    let n=start;
    while(start<n+5 && start<=allmobiles.totalPages ){
        const items={
            value:start,
            url: addParameterToURL(req.url, "page",start),
            isActive:start===page
        }
        pageItem.push(items);
        start+=1;
    }

    res.render('home/allmobiles',{
        title: nameManufacturer || "all",
        searchValue: searchValue,
        allmobiles: allmobiles.docs,
        isPagination: allmobiles.totalPages>1,
        pageItem: pageItem, 
        prevPage: addParameterToURL(req.url,"page",allmobiles.prevPage), 
        nextPage: addParameterToURL(req.url,"page",allmobiles.nextPage),
        canGoPrev: allmobiles.hasPrevPage,
        canGoNext: allmobiles.hasNextPage,
        isLogin:false,
    });
};

exports.detail = async (req, res, next) => {
    const idProduct = req.params.idProduct;

    //Tim dien thoai 
    const detail = await productService.findOneProduct({_id:idProduct});
    
    //Tìm những sản phẩm liên quan
    const similarProduct = await productService.findSimilarProduct({_id:idProduct});

    const page= +req.query.page || 1;;
    const limit=10;
    //Tìm những comment
    const listComment = await commentService.Comment(page,limit,{idProduct:idProduct});
   
    const pageItem=[];
    let start=1;
    if(listComment.totalPages>=5 && page>=listComment.totalPages-1)
        start=listComment.totalPages-4;
    else if(page>2) 
        start=page-2;

    let n=start;
    while(start<n+5 && start<=listComment.totalPages ){
        const items={
            value:start,
            isActive:start===page
        }
        pageItem.push(items);
        start+=1;
    }
    
    
    res.render('home/detail',
                        {detail,
                        listComment: listComment.docs,
                        similarProduct, 
                        isPagination: listComment.totalPages>1,
                        pageItem: pageItem, 
                        prevPage: listComment.prevPage, 
                        nextPage: listComment.nextPage,
                        canGoPrev: listComment.hasPrevPage,
                        canGoNext: listComment.hasNextPage,
                        display: false});
};

exports.postComment = async(req,res,next)=>{
    const page= +req.query.page || 1;;
    const limit=10;
    const idProduct=req.params.idProduct;
    const data={...req.body,idProduct};
  
    await commentService.addComment(data);
    const listComment = await commentService.Comment(page,limit,{idProduct:idProduct});

    const pageItem=[];
    let start=1;
    if(listComment.totalPages>=5 && page>=listComment.totalPages-1)
        start=listComment.totalPages-4;
    else if(page>2) 
        start=page-2;

    
    let n=start;
    while(start<n+5 && start<=listComment.totalPages ){
        const items={
            value:start,
            isActive:start===page
        }
        pageItem.push(items);
        start+=1;
    }
    

    res.json({
        listComment:listComment.docs,
        isPagination: listComment.totalPages>1,
        pageItem: pageItem, 
        prevPage: listComment.prevPage, 
        nextPage: listComment.nextPage,
        canGoPrev: listComment.hasPrevPage,
        canGoNext: listComment.hasNextPage,
    });
}

exports.loadPageComment = async(req,res,next)=>{
    const page= +req.query.page || 1;;
    const limit=10;
    const idProduct=req.params.idProduct;
    
    const listComment = await commentService.Comment(page,limit,{idProduct:idProduct});
    
    const pageItem=[];
    let start=1;
    if(listComment.totalPages>=5 && page>=listComment.totalPages-1)
        start=listComment.totalPages-4;
    else if(page>2) 
        start=page-2;

    
    let n=start;
    while(start<n+5 && start<=listComment.totalPages ){
        const items={
            value:start,
            isActive:start===page
        }
        pageItem.push(items);
        start+=1;
    }

    res.json({
        listComment:listComment.docs,
        isPagination: listComment.totalPages>1,
        pageItem: pageItem, 
        prevPage: listComment.prevPage, 
        nextPage: listComment.nextPage,
        canGoPrev: listComment.hasPrevPage,
        canGoNext: listComment.hasNextPage,
    });
}

exports.loadChildComment = async(req,res,next)=>{
    const filter={};
    filter.idProduct=req.params.idProduct;
    filter.idParentCmt= req.query.idParentComment;
    console.log(filter);
    const listComment=await commentService.listChildComment(filter);
    
    res.json({
        listChildComment:listComment.docs
    });
}

exports.about = (req, res, next) => {
    res.render('home/about');
};

exports.contact = (req, res, next) => {
    res.render('home/contact');
};


exports.checkout = (req, res, next) => {
    res.render('home/checkout');
};

exports.payment = (req, res, next) => {
    res.render('home/payment');
};

exports.filter = async(req,res,next)=>{
    console.log("FILTER")
    const filter={
        manufacturer: req.query.manufacturer,
        storage: req.query.storage,
        price: req.query.price,
        release: req.query.release,
    };

    const product = await productService.findProductByInfo(filter)
    
    console.log(product);
    res.render('home/allmobiles',{
        allmobiles: product,
        isLogin:false,
    });
}