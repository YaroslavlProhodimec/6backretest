import {ObjectId, WithId} from "mongodb";
import {BlogRepository} from "./blog-repository";
import {OutputPostType, PostType} from "../types/post/output";
import {postMapper} from "../types/post/mapper";
import {CreatePostDto, UpdatePostDto} from "../types/post/input";
import {postCollection} from "../index";

export class PostRepository {

    static async getAllPosts() {
        const post: any = await postCollection.find({}).toArray()

        return post.map(postMapper)

    }

    static async getPostById(id: string): Promise<OutputPostType | null> {
        try {
            const post: any = await postCollection.findOne({_id: new ObjectId(id)})
            if (!post) {
                return null
            }
            return postMapper(post)
        } catch (e) {
            return null
        }

    }


    static async createPost(data: CreatePostDto) {
        const createdAt = new Date()

        const blogName = await BlogRepository.getBlogById(data.blogId)

        if (blogName) {
            const newPost: PostType = {
                ...data,
                blogName: blogName.name,
                createdAt: createdAt.toISOString()
            }
            const result = await postCollection.insertOne(newPost)
            return result.insertedId.toString()
        } else {
            return null
        }

    }


    static async deletePost(id: string) {
        try {
            const result = await postCollection.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount === 1
        } catch (e) {
            return false
        }
    }

    static async updatePost(id: string, data: UpdatePostDto) {
        const blog = await BlogRepository.getBlogById(data.blogId)

        let result = await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: blog!.name
            }
        })

        return result.matchedCount === 1
    }


}

