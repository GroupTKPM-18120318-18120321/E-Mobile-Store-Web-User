const mongoose= require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    baseprice: {type: Number, require: true},
    discountprice: {type: Number, require: true},
    cover: {type: String, require: true},
    idmanufacturer: {type: mongoose.Schema.Types.ObjectId, require: true},
    battery: {type: String, require: true},
    camera: {type: String, require: true},
    processor: {type: String, require: true},
    screen:{type: String, require: true},
    storage: {type: String, require: true},

    quantityAvailable: {type: Number,min: 1,required: true},
    quantitySold:{type: Number,min: 0,required: true},
    description: {type: String, required: true},
    releaseDay: {type: Date, default: Date.now()},
    DeletedState: {type: Number,default: 0, enum: [0,1]},
    reviewNum: {type: Number, default: 0},
    trackNum: {type: Number, default: 0},
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

productSchema.virtual('fbaseprice').get(function() {
    return formatConcurency(this.baseprice); 
});

productSchema.virtual('fdiscountprice').get(function() {
    return formatConcurency(this.discountprice); 
});

productSchema.virtual('discount').get(function() {
    return Math.ceil((this.baseprice-this.discountprice)*100/this.baseprice); 
});

// productSchema.virtual('ram').get(function(){
//     let result;
//     if(this.storage!="None"){
//         result= this.storage.substring(0,this.storage.search(/[a-b]/i)-1);
//     }
//     else result = "0";
//     return +result;
// })


productSchema.plugin(mongoosePaginate);
// productSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('allmobiles', productSchema )
