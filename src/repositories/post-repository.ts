import {db} from '../db/db'
import {generateUniqueId} from "./blog-repository";
import {blogCollection, postCollection} from "../index";
import {ObjectId} from "mongodb";

export class PostRepository {

    static async getAllPosts() {
        const result: any = await postCollection.find({}).toArray()
        return result
    }
    static async getPostById(id: string) {
        const objectId = new ObjectId(id);

        const blog:any = await blogCollection.findOne({_id: objectId})

        if (!blog) {
            return null
        }
        return blog
    }
    static async addPost(post: PostType) {

        const foundedPost = db.posts.find((el:any) => el.id === post.id)

        if (foundedPost) {
            return {...foundedPost, id: post.id}
        }
        let newPosts = {...post, id: generateUniqueId(), blogId:'1', blogName: generateUniqueId()}
        db.posts.push(newPosts)

        return {...newPosts}
    }

    static async deletePost(id: string) {
        let foundedIndexPost: any = db.posts.findIndex(b => b.id === id)
        if (foundedIndexPost === -1) {
            return null
        }
        db.posts.splice(foundedIndexPost, 1)

        return foundedIndexPost
    }

    static async updatePost(id: string, blog: PostType) {
        let foundedIndexPost: any = db.posts.findIndex(b => b.id === id)
        let foundedPost: any = db.posts.find(b => b.id === id)
        let {blogId, title, shortDescription, content,} = blog
        if (foundedIndexPost === -1) {
            return null
        }
        const updatedPost = {
            ...foundedPost, blogId,
            title, shortDescription, content,
        }
        db.posts.splice(foundedIndexPost, 1, updatedPost)


        return updatedPost
    }


}

