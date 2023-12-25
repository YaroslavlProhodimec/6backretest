import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post-repository";
import {BlogParams} from "../types/blog/input";
import {postValidation} from "../validators/post-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";


export const postRoute = Router({})

postRoute.get('/', async (req: Request, res: Response) => {
    const posts = await PostRepository.getAllPosts()
    res.status(200).json(posts)
})
postRoute.get('/:id', async (req: Request<BlogParams>, res: Response) => {

    const post = await PostRepository.getPostById(req.params.id)

    if (post) {
        res.status(200).json(post)
        return;
    } else {
        res.sendStatus(404)
    }
})
postRoute.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const creatData = req.body
    const postID = await PostRepository.createPost(creatData)
    if (postID) {
        const newPost = await PostRepository.getPostById(postID)
        if (newPost) {
            res.status(201).json(newPost)
            return;
        }

    }
    res.sendStatus(404)

})
postRoute.put('/:id', authMiddleware, postValidation(), async (req: Request<BlogParams>, res: Response) => {
    const updateData = req.body
    const isUpdated = await PostRepository.updatePost(req.params.id, updateData)
    if (isUpdated) {
        res.sendStatus(204)
        return;
    }
    res.sendStatus(404)
})

postRoute.delete('/:id', authMiddleware, async (req: Request<BlogParams>, res: Response) => {

    let idDeleted = await PostRepository.deletePost(req.params.id)
    if (idDeleted) res.sendStatus(204)
    else res.sendStatus(404)
})




