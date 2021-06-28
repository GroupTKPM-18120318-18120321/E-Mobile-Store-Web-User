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

const formatCurrency = (currency)=>{
    let result="";
    const arr=[];
    let tmp;
    if (currency < 1000) {
        result = String(currency);
    } else {
		do {
			tmp = currency % 1000;
			if (tmp == 0) {
				arr.unshift("000");
			} else if (tmp < 10) {
				arr.unshift("00" + tmp);
			} else if (tmp < 100) {
				arr.unshift("0" + tmp);
			} else {
				arr.unshift(tmp);
			}
            
			currency = Math.floor(currency / 1000);
		} while (currency >= 1000);
	
		arr.unshift(currency);
	
		for (let i = 0; i < arr.length; i++) {
			result += arr[i];
			result += i == arr.length - 1 ? "" : ".";
		}
	}      

    return result;
}

productSchema.virtual('fbaseprice').get(function() {
    return formatCurrency(this.baseprice); 
});

productSchema.virtual('fdiscountprice').get(function() {
    return formatCurrency(this.discountprice); 
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
