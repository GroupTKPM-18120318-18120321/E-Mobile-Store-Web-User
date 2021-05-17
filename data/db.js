const mongoose=require("mongoose");

console.log("db.js 1");

const uri =
    "mongodb+srv://hexad:%23Dd18212227@cluster0.ecnii.mongodb.net/StoreManager?retryWrites=true&w=majority";

const connectDB =async()=>{
    try {
        await mongoose.connect(uri,{
            useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:true
        });
        console.log("Connect successful");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=connectDB 

