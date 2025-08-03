import mongoose from "mongoose"

export default function configureDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log("error Connecting to DB",err)
    })
}

