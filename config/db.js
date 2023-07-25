import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const conn =await  mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to Database ${conn.connection.host}`.bgGreen.white); 
    }
    catch(e){
        console.log(`Error : ${e}`.bgRed.white);
    }
}
export default connectDB;