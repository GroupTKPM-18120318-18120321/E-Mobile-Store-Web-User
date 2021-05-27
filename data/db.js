const mongoose=require("mongoose");

console.log("db.js 1");

const uri = process.env.PRODUCTS_MONGODB_URL;

const connectDB = async()=>{
    try {
        await mongoose.connect(uri,{
            useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log("Connect successful");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=connectDB 

