import {Router,Request,Response} from "express";
import {dbBlogs} from "./db/db-collections";
export const testingRouter = Router()


testingRouter.delete('/all-data',async (req:Request,res:Response)=>{
    await dbBlogs.dropDatabase()
    res.sendStatus(204)
})