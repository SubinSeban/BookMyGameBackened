

const mongoose=require('mongoose')
const connectDB=async()=>{
    // 'mongodb://127.0.0.1:27017/greengrid'
    try {
        await mongoose.connect("mongodb+srv://subinsebastian807:gDD6YZiBQXcDwKj0@cluster0.nbda71j.mongodb.net/")
    console.log('connected to mongodb')
    } catch (error) {
        console.log(error);
    }
    
}
module.exports=connectDB