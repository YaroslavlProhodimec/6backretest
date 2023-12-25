import {Router, Request, Response} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {blogPostValidation, idParamsValidation} from "../validators/blogs-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {BlogParams} from "../types/blog/input";

export const blogRoute = Router({})

blogRoute.get('/', async (req: Request, res: Response) => {
    const blogs = await BlogRepository.getAllBlogs()
    res.status(200).json(blogs)
})

blogRoute.get('/:id', idParamsValidation, async (req: Request, res: Response) => {

    const blog = await BlogRepository.getBlogById(req.params.id)

    if (blog) {
        res.status(200).json(blog)
        return;
    } else {
        res.sendStatus(404)
    }
})

blogRoute.post('/',
    authMiddleware, blogPostValidation(),
    async (req: Request, res: Response) => {

        const blogID = await BlogRepository.createBlog(req.body)
        const newBlog = await BlogRepository.getBlogById(blogID)
        if (newBlog) {
            res.status(201).json(newBlog)
            return;
        }
        res.sendStatus(404)
    })


blogRoute.delete('/:id', authMiddleware, idParamsValidation, async (req: Request<BlogParams>, res: Response) => {
    const isDeleted = await BlogRepository.deleteBlog(req.params.id)
    if (isDeleted) res.sendStatus(204)
    else res.sendStatus(404)

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

blogRoute.put('/:id', authMiddleware, blogPostValidation(), idParamsValidation, async (req: Request<BlogParams>, res: Response) => {
    const updateDate = req.body
    const isUpdated = await BlogRepository.updateBlog(req.params.id,updateDate)

    if (isUpdated) {
        res.sendStatus(204)
        return;
    }
    res.sendStatus(404)

})


