import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post-repository";
import {BlogParams} from "../types/blog/input";
import {postValidation} from "../validators/post-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";

export const postRoute = Router({})

postRoute.get('/', (req: Request, res: Response) => {
    const posts = PostRepository.getAllPosts()
    res.status(200).send(posts)
})

postRoute.post('/', authMiddleware,postValidation(),  (req: Request, res: Response) => {
    const blogs = PostRepository.addPost(req.body)
    res.status(201).send(blogs)
})
postRoute.delete('/:id', authMiddleware, (req: Request<BlogParams>, res: Response) => {
    const blogs = PostRepository.deletePost(req.params.id)
    if (!blogs) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})
postRoute.put('/:id', authMiddleware, postValidation(), (req: Request<BlogParams>, res: Response) => {
    const blogs = PostRepository.updatePost(req.params.id, req.body)

    if (!blogs) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

postRoute.get('/:id', (req: Request<BlogParams>, res: Response) => {
    const id = req.params.id
    const blog = PostRepository.getPostById(id)

    if (!blog) {
        res.sendStatus(404)
    }
    res.send(blog)
})

