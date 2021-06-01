
const cartModel=require('../mongoose/cartModel')

exports.cart = async(idSession)=>{
    const cart= await cartModel.findOne({_id:idSession});
    return cart;
}
exports.createCart=async()=>{
    
    const cart = new cartModel({
        listProduct:{},
    })
    cart.save();

    return cart._id;
}

exports.pushProduct=async(idSession,idProduct)=>{
    const cart=await cartModel.findOne({_id:idSession});

    let count;
   
    if(!cart.listProduct || !cart.listProduct[idProduct]) 
        count=0;
    else
        count = cart.listProduct[idProduct];
    
    let listProduct;
    if(!cart.listProduct) listProduct={};
    else listProduct=cart.listProduct;
    listProduct[idProduct]=count+1;
 
    await cartModel.findOneAndUpdate({_id:idSession},{listProduct: listProduct});
}   

exports.popProduct=async(idSession,idProduct)=>{
    const cart=await cartModel.findOne({_id:idSession});

    let count;
   
    if(!cart.listProduct || !cart.listProduct[idProduct]) 
        count=0;
    else
        count = cart.listProduct[idProduct];
    
    let listProduct;
    if(!cart.listProduct) listProduct={};
    else listProduct=cart.listProduct;
    listProduct[idProduct]=count<2?1:count-1;
 
    await cartModel.findOneAndUpdate({_id:idSession},{listProduct: listProduct});
}   



exports.removeProduct=async(idSession,idProduct)=>{
    const cart=await cartModel.findOne({_id:idSession});

    let listProduct;
    if(!cart.listProduct) listProduct={};
    else listProduct=cart.listProduct;

    delete listProduct[idProduct];
    await cartModel.findOneAndUpdate({_id:idSession},{listProduct: listProduct});
}

exports.removeCart=async(idSession)=>{
    await cartModel.findOneAndDelete({_id:idSession});

}