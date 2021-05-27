const productService = require('../models/service/productService');
let overviewsearch;

console.log("productController.js 1");

exports.product = async(req, res, next) => {
    //Lấy dữ liệu 
    console.log("productController.js 2");
    //const product = await allmobilesModel.find();
    const product = await productService.findProduct();
    //console.log(product);
    console.log("req.protocol");
    console.log(req.get('Host'));
    console.log(req.protocol);
    res.render('home/index', {product, isLogin: false, display: true, register: true});

};

exports.brands = async (req, res, next) => {
    const page = +req.query.page || 1;
    const allmobiles = await productService.listmobiles(page, 3,"");
    //console.log('allmobiles', allmobiles);
   
    res.render('home/allmobiles',{
        title: "All Mobiles",
        totalpages: allmobiles.totalPages,
        allmobiles: allmobiles.docs,
        previousPage:"?page=" +  allmobiles.prevPage,
        pagecurrent: allmobiles.page,
        hasnextpage: allmobiles.hasNextPage,
        nextpage: "?page=" +  allmobiles.nextPage,
        linkpagecurrent: "?page=" +  allmobiles.page,
        linkhasnextpage:"?page=" +  (+allmobiles.page + 1),
        numnextpage: +allmobiles.page + 1,
        isLogin: false
    });
    
};

exports.search = async (req, res, next) => {
 
   
    // var search = req.body.search

    // console.log(search);
    // const allmobiles = await allmobilesModel.find({name : {$regex: ".*" + search + ".*"}});
    // console.log('allmobiles', allmobiles);
    // res.render('home/allmobiles',{title: "All Mobiles",allmobiles});
    
    var search;

    const page = +req.query.page || 1;
    console.log("page");
    console.log(page);
   
    if(page === 1 && req.query.search != undefined){
        search = req.query.search;
        overviewsearch = search;
    }
    else{
        search = overviewsearch;
    }

    console.log("search");
    console.log(req.query.search);

    console.log("overviewsearch");
    console.log(overviewsearch);
    const allmobiles = await productService.listmobiles(page, 3, search);

    console.log("papercurrent");
    console.log(allmobiles.page);

    res.render('home/allmobiles',{
        title: "All Mobiles",
        totalpages: allmobiles.totalPages,
        allmobiles: allmobiles.docs,
        previousPage:"?page=" +  allmobiles.prevPage,
        pagecurrent: allmobiles.page,
        hasnextpage: allmobiles.hasNextPage,
        nextpage: "?page=" + allmobiles.nextPage,
        linkpagecurrent: "?page=" +  allmobiles.page,
        linkhasnextpage:"?page=" +  (+allmobiles.page + 1),
        numnextpage: +allmobiles.page + 1,
        searchs : "?search=" + search,
        isLogin: true
    });
};



exports.apple = async (req, res, next) => {
    const page = +req.query.page || 1;
    const allmobiles = await productService.listmobiles(page, 3, "iPhone");

    //const allmobiles = await allmobilesModel.find({name: /^iPhone/});
    //console.log('allmobiles', allmobiles);
   
    res.render('home/allmobiles',{
        title: "Apple",
        totalpages: allmobiles.totalPages,
        allmobiles: allmobiles.docs,
        previousPage:"?page=" +  allmobiles.prevPage,
        pagecurrent: allmobiles.page,
        hasnextpage: allmobiles.hasNextPage,
        nextpage: "?page=" +  allmobiles.nextPage,
        linkpagecurrent: "?page=" +  allmobiles.page,
        linkhasnextpage:"?page=" +  (+allmobiles.page + 1),
        numnextpage: +allmobiles.page + 1,
        isLogin: true
    });
};

exports.samsung = async (req, res, next) => {
    const page = +req.query.page || 1;
    const allmobiles = await productService.listmobiles(page, 3, "Samsung");

    //const allmobiles = await allmobilesModel.find({name: /^iPhone/});
    //console.log('allmobiles', allmobiles);
   
    res.render('home/allmobiles',{
        title: "Samsung",
        totalpages: allmobiles.totalPages,
        allmobiles: allmobiles.docs,
        previousPage:"?page=" +  allmobiles.prevPage,
        pagecurrent: allmobiles.page,
        hasnextpage: allmobiles.hasNextPage,
        nextpage: "?page=" +  allmobiles.nextPage,
        linkpagecurrent: "?page=" +  allmobiles.page,
        linkhasnextpage:"?page=" +  (+allmobiles.page + 1),
        numnextpage: +allmobiles.page + 1,
        isLogin: true
    });
};

exports.detail = async (req, res, next) => {
    var id = req.params.id;
    console.log("DAY LA ID "+ req.params.id);
    const detail = await productService.findOneProduct({_id:id});
    console.log('detail', detail);
   
    res.render('home/detail',{detail, display: false});
};

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