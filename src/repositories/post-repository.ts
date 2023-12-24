import {blogCollection, postCollection} from "../index";
import {ObjectId} from "mongodb";

export class PostRepository {

    static async getAllPosts() {
        const result: any = await postCollection.find({}).toArray()
        // console.log(result,'result')
        // return {
        //     ...result,
        // _id:undefined
        // }
        const modifiedResult = result.map((post: any) => ({
            ...post,
            id: post._id.toString(),
            _id: undefined,
        }));

        return modifiedResult;
    }

    static async getPostById(id: string) {
        const objectId = new ObjectId(id);

        const post: any = await postCollection.findOne({_id: objectId})

        if (!post) {
            return null
        }
        return post
    }


    static async addPost(post: PostType) {
        // "id": "string",
        //     "title": "string",
        //     "shortDescription": "string",
        //     "content": "string",
        //     "blogId": "string",
        //     "blogName": "string",
        //     "createdAt": "2023-12-24T14:58:03.422Z"

        // "title": "string",
        //     "shortDescription": "string",
        //     "content": "string",
        //     "blogId": "string"
        const createdAt = new Date()
        const publicationDate = new Date()

        publicationDate.setDate(createdAt.getDate() + 1)
        // let idCreate = new ObjectId().toString()
        // const result: any = await postCollection.insertOne({...post,_id: undefined,
        //     id: new ObjectId().toString(),blogName:'xaxxa', createdAt: createdAt});
        // const id =  result.insertedId
        // const found: any = await postCollection.findOne({_id:id})
        //
        // return {
        //     _id: undefined,
        //     id:found.id.toString(),
        //     title: found.title,
        //     createdAt: createdAt,
        //     shortDescription: found.shortDescription,
        //     content: found.content,
        //     blogId: found.blogId,
        //     blogName: found.blogName
        // }
        const result: any = await postCollection.insertOne({
            ...post,
            // _id: undefined,
             _id:new ObjectId() ,
            id: new ObjectId().toString(),
            blogName: 'xaxxa',
             blogId:post.blogId,
            createdAt: createdAt
        });
        const found: any = await postCollection.findOne({_id: result.insertedId})

        return {
            // id: found._id.toString(),
            // // ...found,
            // _id: undefined,
            // name: found.name,
            // description: found.description,
            // websiteUrl: found.websiteUrl,
            // isMembership: false,
            // // isMembership: found.isMembership,
            // createdAt: found.createdAt.toISOString()
            //
            //     _id: undefined,
            ...found,
                id: found._id.toString(),
                title: found.title,
                createdAt: found.createdAt.toISOString(),
                shortDescription: found.shortDescription,
                content: found.content,
                blogId: found.blogId,
                blogName: found.blogName
        }
    }


    static async deletePost(id: string) {
        const result = await postCollection.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount
    }

    static async updatePost(id: string, post: PostType) {
        const objectId = new ObjectId(id);
        console.log(id, 'id')
        const found: any = await postCollection.findOne({_id: objectId})
        console.log(found, 'found')

        let result = await postCollection.updateOne({_id: objectId}, {
            $set: {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId
            }
        })

        console.log(result, 'result')
        return !!result.matchedCount
    }


}

