const mongoose= require('mongoose');
const Schema = mongoose.Schema();
const mongoosePaginate = require('mongoose-paginate-v2');

//Tạo model
const commentSchema = mongoose.Schema({
    nameCustomer: {type: String},
    avatar: {type:String},
    content: {type: String, require: true},
    cmtDate: {type: Date, default: Date.now()},

    idProduct: {type: mongoose.Schema.Types.ObjectId , require: true},
    idParentCmt: {type: mongoose.Schema.Types.ObjectId , require: true},
    // idCustomer: {type: mongoose.Schema.Types.ObjectId , require: true},
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

const calculateTime= (time)=>{
    const t1 = Date.parse(time);
    const timeNow = new Date(Date.now());
    const t2 = Date.parse(timeNow);
    const diff= Math.ceil((t2-t1)/1000)
    let result="";

    if(diff>365*24*3600){
        result+=new Date(time).toLocaleDateString();
    }
    else if(diff>30*24*3600){
        result+=Math.floor(diff/(30*24*3600)) + " tháng trước";
    }
    else if(diff>24*3600){
        result+=Math.floor(diff/(24*3600)) + " ngày trước";
    }
    else if(diff>3600){
        result+=Math.floor(diff/(3600)) + " giờ trước";
    }
    else if(diff>60){
        result+=Math.floor(diff/(60)) + " phút trước";
    }
    else{
        result+="Gần đây";
    }
    return result;
}

commentSchema.virtual('time').get(function() {
     return calculateTime(this.cmtDate); 
});

commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', commentSchema, "Comment" )