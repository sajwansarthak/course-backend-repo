const {Router} = require ("express")
const { userModel, purchasesModel, courseModel } = require("../db")
const userRouter = Router();
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require ("../config")
const { userMiddleware } = require ("../middlewares/user")

userRouter.post("/signup",async function(req,res){
    const {email ,password,firstName,lastName} = req.body;
    //TODO hash the password and add try catch block and add zod 

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })


    res.json({
        message: "Endpoint"
    })
})
userRouter.post("/signin",async function(req,res){
    const { email ,password } = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD)

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
userRouter.get("/purchases",userMiddleware,async function(req,res){
    const userId = req.userId

    const purchases = await purchasesModel.find({
        userId
    })

    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x =>x.courseId)}
    })
    res.json({
        purchases: purchases
    })
})

module.exports = {
    userRouter:userRouter
}