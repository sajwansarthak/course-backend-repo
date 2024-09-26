const {Router} = require ("express");
const { userMiddleware } = require("../middlewares/user")
const{ puschasesModel, courseModel } = require("../db")
const courseRouter = Router();

courseRouter.post("/purchases",userMiddleware,async function(req,res){
    const userId = req.userId
    const courseId = req.body.courseId;

    await puschasesModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have successfully bought the course"
    })
})
courseRouter.get("/preview",async function(req,res){


    const courses = await courseModel.find({

    })
    res.json({
        courses: courses
    })
})

module.exports ={
    courseRouter: courseRouter
}