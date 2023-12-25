import {Router,Request,Response} from "express";
import {blogCollection, dbBlogs, postCollection} from "./index";
export const testingRouter = Router({})


testingRouter.delete('/all-data',async (req:Request,res:Response)=>{
    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    // await dbBlogs.dropDatabase()
    res.sendStatus(204)
})