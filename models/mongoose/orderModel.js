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

orderSchema.virtual('ftotal').get(function() {
    return formatConcurency(this.total); 
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
