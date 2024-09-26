const mongoose = require("mongoose")
console.log("connected to mongodb")
//mongoose.connect("mongodb+srv://sardbuser:sardbuserpassword@cluster0.4tnlc.mongodb.net/coursera-app")


const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new Schema({
    email:{type:String,unique:true},
    password: String,
    firstName: String,
    lastName: String
})
const adminSchema = new Schema({
    email: {type: String,unique: true},
    password: String,
    firstName: String,
    lastNanme: String
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})
const purchasesSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("user",userSchema)
const adminModel = mongoose.model("admin",adminSchema)
const courseModel = mongoose.model("course",courseSchema)
const purchasesModel = mongoose.model("purchases",purchasesSchema)

module.exports ={
    userModel,
    adminModel,
    courseModel,
    purchasesModel
}