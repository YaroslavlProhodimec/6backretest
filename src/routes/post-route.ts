import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post-repository";
import {BlogParams} from "../types/blog/input";
import {postValidation} from "../validators/post-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {BlogRepository} from "../repositories/blog-repository";

export const postRoute = Router({})

postRoute.get('/', async (req: Request, res: Response) => {
    const posts = await PostRepository.getAllPosts()
    res.status(200).send(posts)
})
postRoute.get('/:id', async (req: Request<BlogParams>, res: Response) => {
    const id = req.params.id
    const blog = await PostRepository.getPostById(id)

    if (!blog) {
        res.sendStatus(404)
    }
    res.send(blog)
})
postRoute.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const posts = await PostRepository.addPost(req.body)
    if (posts) {
        res.status(201).send(posts)
    } else {
        res.sendStatus(404)
    }
})
postRoute.put('/:id', authMiddleware, postValidation(),async (req: Request<BlogParams>, res: Response) => {

    try {
       await PostRepository.updatePost(req.params.id, req.body)

        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
})

postRoute.delete('/:id', authMiddleware,async (req: Request<BlogParams>, res: Response) => {
    const blogs = await PostRepository.deletePost(req.params.id)
    if (!blogs) {
        res.sendStatus(404)
    }
    res.sendStatus(204)

})




