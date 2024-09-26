const { Router } = require ("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require ("../config");
const { adminMiddleware } = require("../middlewares/admin");

adminRouter.post("/signup",async function(req,res){
    const {email ,password,firstName,lastName} = req.body;
    //TODO hash the password and add try catch block and add zod 

    await adminModelModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })


    res.json({
        message: "Endpoint"
    })
})
adminRouter.post("/signin",async function(req,res){
    const { email ,password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id:user._id
        },JWT_ADMIN_PASSWORD)

        //Do cookie logic 
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})
//app.use(ckeckmiddlware)
adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const {title ,description,imageUrl,price}= req.body;

    await courseModel.create({
        title: title,
        description: description,
        imageUrl:imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "course created",
        courseId: course._id
    })
})
adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const {title ,description,imageUrl,price,courseId}= req.body;

    await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl:imageUrl,
        price: price,
    })

    res.json({
        message: "course edited",
        courseId: courseId
    })
})
adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const courses = await adminModel.find({
        creatorId: adminId
    })

    res.json({
        message: "all your courses",
        courses: courses
    })
})

module.exports = {
    adminRouter:adminRouter
}