import {v4 as uuidv4} from 'uuid';
import {blogCollection} from "../index";
import {BlogType, OutputBlogType} from "../types/blog/output";
import {ObjectId, WithId} from "mongodb";
import {blogMapper} from "../types/blog/mapper";
import {UpdateBlogData} from "../types/blog/input";

export class BlogRepository {

    static async getAllBlogs() {

        // try {
        const result: any = await blogCollection.find({}).toArray()
        // return {
        //     id: result._id,
        //     name: result.name,
        //     description: result.description,
        //     websiteUrl: result.websiteUrl,
        //     createdAt: createdAt.toISOString(),
        //     isMembership: false,
        // }
        return result
        // } catch (e){
        //     console.log(e,'ERROR getAllBlogs')
        //  }
    }

    static async getBlogById(id: string): Promise<OutputBlogType | null> {
        const objectId = new ObjectId(id);

        const blog: any = await blogCollection.findOne({_id: objectId})

        if (!blog) {
            return null
        }
        return blogMapper(blog)
    }

    static async addBlog(blog: BlogType) {

        const createdAt = new Date()
        const publicationDate = new Date()

        publicationDate.setDate(createdAt.getDate() + 1)
        const result: any = await blogCollection.insertOne({
            ...blog,
            _id: undefined,
            id: new ObjectId().toString(),
            isMembership: false,
            createdAt: createdAt
        });
        const found: any = await blogCollection.findOne({_id: result.insertedId})

        return {
            id: found._id.toString(),
            // ...found,
            _id: undefined,
            name: found.name,
            description: found.description,
            websiteUrl: found.websiteUrl,
            // isMembership:false,
            // isMembership: found.isMembership,
            createdAt: found.createdAt.toISOString()
        }
    }

    static async updateBlog(id: string, updateData: UpdateBlogData)
        :
        Promise<boolean> {
        const objectId = new ObjectId(id);
        console.log(id, 'id')
        // console.log(updateData,'updateData')
        const found: any = await blogCollection.findOne({_id: objectId})
        console.log(found, 'found')

        let result = await blogCollection.updateOne({_id: objectId}, {
            $set: {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl,
            }
        })
        console.log(result, 'result')
        return !!result.matchedCount
    }

    static async deleteBlog(id: string) {
        const result = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount
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

