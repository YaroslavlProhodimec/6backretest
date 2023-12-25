import {v4 as uuidv4} from 'uuid';
import {blogCollection} from "../index";
import {BlogType, OutputBlogType} from "../types/blog/output";
import {ObjectId, WithId} from "mongodb";
import {CreateBlogDto,  UpdateBlogDto} from "../types/blog/input";
import {blogMapper} from "../types/blog/mapper";

export class BlogRepository {

    static async getAllBlogs() {
        const blogs: WithId<BlogType>[] = await blogCollection.find({}).toArray()
        return blogs.map(blogMapper)

    }

    static async getBlogById(id: string): Promise<OutputBlogType | null> {
        try {
            const blog: WithId<BlogType> | null = await blogCollection.findOne({_id: new ObjectId(id)})
            if (!blog) {
                return null
            }
            return blogMapper(blog)
        } catch (err) {
            return null
        }

    }

    static async createBlog(data: CreateBlogDto) {

        const createdAt = new Date()
        const newBlog: BlogType = {
            ...data,
            createdAt: createdAt.toISOString(),
            isMembership: false
        }
        const result = await blogCollection.insertOne(newBlog)
        return result.insertedId.toString()

    }

    static async updateBlog(id: string, data: UpdateBlogDto) {


        let result = await blogCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl,
            }
        })
        return result.matchedCount === 1
    }

    static async deleteBlog(id: string) {
       try {
           const result = await blogCollection.deleteOne({_id: new ObjectId(id)})
          return  result.deletedCount === 1
       } catch (e){
           return false
       }

    }

    static async deleteAllBlogs() {

        const result = await blogCollection.deleteMany({})

        return !!result.deletedCount
    }

}

export function generateUniqueId(): string {
    const fullUUID = uuidv4();
    return fullUUID.slice(0, 28);
}

