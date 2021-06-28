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

detailSchema.virtual('ftotal').get(function() {
    return formatCurrency(this.total); 
});

module.exports = mongoose.model('DetailOrder', detailSchema,'DetailOrder' )
