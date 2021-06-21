const mongoose= require('mongoose');
const Schema = mongoose.Schema();

console.log("model.js");
//Tạo model
const orderSchema = mongoose.Schema({
    orderDate: {type: Date, require: true},
    deliveryDate: {type: Date, require: true},
    street: {type: String},
    subDistrict: {type:String},
    district: {type: String},
    city:{type: String},

    paymentMethod: {type: String},
    orderStatus: {type: mongoose.Schema.Types.ObjectId},
    idCustomer:{type: mongoose.Schema.Types.ObjectId},
    phone: {type:String},
    total: {type: Number}
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

orderSchema.virtual('ftotal').get(function() {
    return formatCurrency(this.total); 
});

orderSchema.virtual('time').get(function() {
    const time= new Date(this.orderDate);
    const d = time.getDate();
    const m =  time.getMonth() +1;
    const y =  time.getFullYear(); 
    return d + "-" + m + "-" + y;
});

orderSchema.virtual('address').get(function() {
        return `${this.street}, ${this.subDistrict}, ${this.district}, ${this.city}`; 
});

module.exports = mongoose.model('Order', orderSchema,'Order' )
