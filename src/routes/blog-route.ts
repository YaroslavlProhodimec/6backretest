import {Router, Request, Response} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {blogPostValidation, idParamsValidation} from "../validators/blogs-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {productsRepository} from "../repositories/products-repository";
import {productsRouter} from "./products-router";
import {BlogParams} from "../types/blog/input";

export const blogRoute = Router({})

blogRoute.get('/',async (req: Request, res: Response) => {
    const blogs = await BlogRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogRoute.get('/:id',idParamsValidation,async (req: Request, res: Response) => {
    const id = req.params.id
    const blog = await BlogRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
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
        } else {
            res.sendStatus(404)
        }
})


blogRoute.delete('/:id',authMiddleware,idParamsValidation,async (req: Request<BlogParams>, res: Response) => {

    const blogs = await BlogRepository.deleteBlog(req.params.id)

    if(!blogs){
        res.sendStatus(404)
    }
    res.sendStatus(204)
})
blogRoute.delete('/',authMiddleware,idParamsValidation,async (req: Request<BlogParams>, res: Response) => {

    const blogs = await BlogRepository.deleteAllBlogs()

    if(!blogs){
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

blogRoute.put('/:id',authMiddleware,blogPostValidation(),idParamsValidation,async (req: Request<BlogParams>, res: Response) => {

    const blogs = await BlogRepository.updateBlog(req.params.id,req.body)

    if (!blogs) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})


