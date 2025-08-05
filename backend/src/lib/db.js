import mongoose from "mongoose"

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected : ${conn.connection.host}`)
    }catch(erroe){
        console.log(erroe)
        process.exit(1)
    };
    
}