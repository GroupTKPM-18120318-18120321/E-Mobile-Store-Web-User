const mongoose= require('mongoose');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const detailSchema = mongoose.Schema({
    idProduct: {type: mongoose.Schema.Types.ObjectId},
    idOrder: {type: mongoose.Schema.Types.ObjectId},
    quantity: {type: Number},
    total: {type: Number},
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

const formatConcurency = (concurency)=>{
    let result="";
    const arr=[];
    let tmp;
    do{
        tmp=concurency%1000;
        arr.unshift(tmp==0?"000":tmp);
        concurency=Math.floor(concurency/1000);
    }while(concurency>0);

    for(let i=0;i<arr.length;i++){
        result+=arr[i];
        result += i==arr.length-1 ? "" :".";
    }   

    return result;
}

detailSchema.virtual('ftotal').get(function() {
    return formatConcurency(this.total); 
});

module.exports = mongoose.model('DetailOrder', detailSchema,'DetailOrder' )
