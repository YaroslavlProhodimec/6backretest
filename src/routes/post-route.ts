import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post-repository";
import {BlogParams} from "../types/blog/input";
import {postValidation} from "../validators/post-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {BlogRepository} from "../repositories/blog-repository";
import {blogCollection, postCollection} from "../index";
import {ObjectId} from "mongodb";

export const postRoute = Router({})

postRoute.get('/', async (req: Request, res: Response) => {
    const posts = await PostRepository.getAllPosts()
    res.status(200).send(posts)
})
postRoute.get('/:id', async (req: Request<BlogParams>, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
    }
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
if(!req.params.id){
    res.sendStatus(404)
}
    try {
       await PostRepository.updatePost(req.params.id, req.body)

        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
})

postRoute.delete('/:id', authMiddleware,async (req: Request<BlogParams>, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
    }
    let idCreate = new ObjectId(req.params.id)
    const found: any = await postCollection.findOne({_id:idCreate})
    console.log(found,'found')
    // try {
    if(found){
        let result = await postCollection.deleteOne({_id: idCreate})
        console.log(result,'result')

        res.sendStatus(204)
    }
    res.sendStatus(404)

    // const blogs = await PostRepository.deletePost(req.params.id)


})




