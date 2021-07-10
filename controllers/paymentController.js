const productService = require('../models/service/productService');
const cartService = require('../models/service/cartService');
const orderService = require('../models/service/orderService');
const detailOrderService = require('../models/service/detailOrderService');
const handle = require('../public/js/custom/handle');
const revenueService = require('../models/service/revenueService');
const revenueModel = require('../models/mongoose/revenueModel');

exports.checkout = async (req, res, next) => {
    const idUser = req.query.idUser;
    const sessionId = req.signedCookies.cartSession;
    const cart = await cartService.cart(sessionId);

    let totalPrice = 0;
    let product;
    const cartProduct = cart.listProduct;
    const listProduct = [];
    let numProduct = 0;

    //Lấy các sản phẩm trong giỏ hàng để render trang web
    for (let i in cartProduct) {
        product = await productService.findOneProduct({ _id: i });
        product.total = parseInt(cartProduct[i]) * parseInt(product.discountprice);
        product.quantity = parseInt(cartProduct[i]);
        product.ftotal = handle.formatCurrency(product.total);
        listProduct.push(product);

        totalPrice += product.total;
        numProduct += 1;
    }

    const deliveryCharge = await orderService.calcDeliveryCharge(totalPrice);
    totalPrice += deliveryCharge;

    res.render('home/checkout', {
        numProduct: numProduct,
        totalPrice: handle.formatCurrency(totalPrice),
        listProduct: listProduct,
        deliveryCharge: deliveryCharge,
        fdeliveryCharge: handle.formatCurrency(deliveryCharge)
    });
};

exports.payment = async (req, res, next) => {
    const idUser = req.query.idUser;
    const sessionId = req.signedCookies.cartSession;

    const cart = await cartService.cart(sessionId);
    const deliveryDate = await orderService.calcDeliveryDate(new Date());

    console.log(req.body);
    //Tạo hóa đơn
    const object = {
        orderDate: new Date(),
        street: req.body.street,
        subDistrict: req.body.subDistrict,
        district: req.body.district,
        city: req.body.city,
        idCustomer: req.user._id,
        phone: req.body.phoneNumber,
        paymentMethod: req.body.paymentMethod,
        orderStatus: "5fef361f5a75811ec4f91033",
        deliveryCharge: Number(req.body.deliveryCharge),
        deliveryDate: deliveryDate,
    }
    const idOrder = await orderService.addOrder(object);

    //Lưu chi tiết hóa đơn 
    let totalPrice = 0;
    let product;
    const cartProduct = cart.listProduct;
    let numProduct = 0;
    for (let i in cartProduct) {
        product = (await productService.findOneProduct({ _id: i })).toObject();
        product.idOrder = idOrder;
        product.total = parseInt(cartProduct[i]) * parseInt(product.discountprice);
        product.quantity = parseInt(cartProduct[i]);

        await productService.increaseQuantity({ _id: product._id }, product.quantitySold, product.quantityAvailable, product.quantity);
        detailOrderService.addDetailOrder(product);
        totalPrice += product.total;
        numProduct += 1;
    }

    //Thêm phí giao hàng vào tổng tiền hóa đơn
    totalPrice += Number(req.body.deliveryCharge);

    //Cập nhập tổng tiền hóa đơn
    await orderService.updateOrder({ _id: idOrder }, { total: totalPrice });

    //Thêm hóa đơn vào báo cáo doanh thu tháng
    const nowDate = new Date();
    let monthRevenueReport;
    const check = await revenueService.checkMonthRevenueReport(nowDate.getMonth() + 1, nowDate.getFullYear());

    if (check) {
        const date = (nowDate.getMonth() + 1) + "/" + nowDate.getFullYear();
        monthRevenueReport = await revenueModel.monthRevenueModel.findOne({ date: date });
    } else {
        monthRevenueReport = await revenueService.addMonthRevenueReport(nowDate.getMonth() + 1, nowDate.getFullYear());
    }

    //Thêm hóa đơn vào báo cáo doanh thu ngày
    await revenueService.updateDateRevenueWithNewOrder(nowDate, idOrder, monthRevenueReport._id);
    //await revenueModel.monthRevenueModel.findOneAndUpdate({_id: })


    //Xóa dữ liệu trong cart giỏ hàng
    res.clearCookie('cartSession');
    cartService.removeCart(sessionId);

    res.render('home/payment');
};

exports.cart = async (req, res, next) => {
    const sessionId = req.signedCookies.cartSession;
    //const idProduct=req.query.idProduct;
    console.log(sessionId);
    const cart = await cartService.cart(sessionId);

    let totalPrice = 0;
    let product;
    const cartProduct = cart.listProduct;
    const listProduct = [];
    let numProduct = 0;
    for (let i in cartProduct) {
        product = await productService.findOneProduct({ _id: i });
        product.total = parseInt(cartProduct[i]) * parseInt(product.discountprice);
        product.quantity = parseInt(cartProduct[i]);
        product.ftotal = handle.formatCurrency(product.total);

        listProduct.push(product);

        totalPrice += product.total;
        numProduct += 1;
    }

    //console.log(listProduct);

    res.render('home/cart', {
        numProduct: numProduct,
        totalPrice: handle.formatCurrency(totalPrice),
        listProduct: listProduct
    });
}

exports.addtoCart = async (req, res, next) => {
    const sessionId = req.signedCookies.cartSession;
    const idProduct = req.query.idProduct;
    
    //console.log(req.body);
    //console.log(sessionId);
    //console.log(idProduct);
    await cartService.pushProduct(sessionId, idProduct);

    const cart = await cartService.cart(sessionId);
    const numProduct = Object.keys(cart.listProduct).length;


    let totalPrice = 0;
    let product;
    for (let i in cart.listProduct) {
        product = await productService.findOneProduct({ _id: i });
        product.total = parseInt(cart.listProduct[i]) * parseInt(product.discountprice);
        totalPrice += product.total;
    }

    product = (await productService.findOneProduct({ _id: idProduct })).toObject();
    const cartProduct = cart.listProduct[idProduct];
    product.total = parseInt(cartProduct) * parseInt(product.discountprice);
    product.quantity = parseInt(cartProduct);
    product.ftotal = handle.formatCurrency(product.total);

    res.json({
        numProduct: numProduct,
        totalPrice: handle.formatCurrency(totalPrice),
        product: product
    });
}

exports.popCart = async (req, res, next) => {
    const sessionId = req.signedCookies.cartSession;
    const idProduct = req.query.idProduct;

    await cartService.popProduct(sessionId, idProduct);

    let totalPrice = 0;
    const cart = await cartService.cart(sessionId);
    const numProduct = Object.keys(cart.listProduct).length;

    let product;
    for (let i in cart.listProduct) {
        product = await productService.findOneProduct({ _id: i });
        product.total = parseInt(cart.listProduct[i]) * parseInt(product.discountprice);
        totalPrice += product.total;
    }

    product = (await productService.findOneProduct({ _id: idProduct })).toObject();
    const cartProduct = cart.listProduct[idProduct];
    product.total = parseInt(cartProduct) * parseInt(product.discountprice);
    product.quantity = parseInt(cartProduct);
    product.ftotal = handle.formatCurrency(product.total);

    res.json({
        numProduct: numProduct,
        totalPrice: handle.formatCurrency(totalPrice),
        product: product
    });
}

exports.removeCart = async (req, res, next) => {
    const sessionId = req.signedCookies.cartSession;
    const idProduct = req.query.idProduct;

    await cartService.removeProduct(sessionId, idProduct);

    let totalPrice = 0;
    const cart = await cartService.cart(sessionId);
    const numProduct = Object.keys(cart.listProduct).length;

    let product;
    for (let i in cart.listProduct) {
        product = await productService.findOneProduct({ _id: i });
        product.total = parseInt(cart.listProduct[i]) * parseInt(product.discountprice);
        totalPrice += product.total;
    }

    console.log(product);
    res.json({
        numProduct: numProduct,
        totalPrice: handle.formatCurrency(totalPrice)
    });
}


exports.history = async (req, res, next) => {
    const idUser = req.params.idUser;
    const listOrder = await orderService.getListOrder({ _id: idUser });
    console.log(listOrder);
    res.render('home/history', {
        listOrder: listOrder,
        isEmpty: listOrder.length <= 0
    });
}