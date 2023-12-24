import {Router, Request, Response} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {blogPostValidation, idParamsValidation} from "../validators/blogs-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {productsRepository} from "../repositories/products-repository";
import {productsRouter} from "./products-router";
import {BlogParams} from "../types/blog/input";
import {blogCollection, postCollection} from "../index";
import {ObjectId} from "mongodb";

export const blogRoute = Router({})

blogRoute.get('/',async (req: Request, res: Response) => {
    const blogs = await BlogRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogRoute.get('/:id',idParamsValidation,async (req: Request, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
    }
    const id = req.params.id
    const blog = await BlogRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
        return;

    }
    res.send(blog)
})

blogRoute.post('/',
    authMiddleware,blogPostValidation(),
    async (req: Request, res: Response) => {
        // console.log(req.body,'req.body')
    const blogs = await  BlogRepository.addBlog(req.body)
        if(blogs){
            res.status(201).send(blogs)
            return;

        } else {
            res.sendStatus(404)
        }
})


blogRoute.delete('/:id',authMiddleware,idParamsValidation,async (req: Request<BlogParams>, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
    }
    let idCreate = new ObjectId(req.params.id)

    const found: any = await blogCollection.findOne({_id:idCreate})
    const foundPost: any = await postCollection.findOne({_blogId:idCreate})

    console.log(found,'found')
    // try {
    if(found){
        let result = await blogCollection.deleteOne({_id: idCreate})
        await foundPost.deleteOne({_id: idCreate})
        console.log(result,'result')

        res.sendStatus(204)
        return;
    }
    // } catch (e) {
        res.sendStatus(404)

    // }
    // if(!blogs){
    //     res.sendStatus(404)
    // }
    // res.sendStatus(204)
})
// blogRoute.delete('/',authMiddleware,idParamsValidation,async (req: Request<BlogParams>, res: Response) => {
//
//     const blogs = await BlogRepository.deleteAllBlogs()
//
//     if(!blogs){
//         res.sendStatus(404)
//     }
//     res.sendStatus(204)
// })

blogRoute.put('/:id',authMiddleware,blogPostValidation(),idParamsValidation,async (req: Request<BlogParams>, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
    }
    const blogs = await BlogRepository.updateBlog(req.params.id,req.body)

    if (!blogs) {
        res.sendStatus(404)
        return;

    }
    res.sendStatus(204)
})


