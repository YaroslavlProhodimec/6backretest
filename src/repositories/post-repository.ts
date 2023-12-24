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
        const modifiedResult = result.map((post:any) => ({
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

        const result: any = await postCollection.insertOne({...post,_id: undefined,
            id: new ObjectId().toString(),blogName:'xaxxa', createdAt: createdAt});
        const id =  result.insertedId
        const found: any = await postCollection.findOne({_id:id})

        return {
            _id: undefined,
            id:found._id,
            title: found.title,
            createdAt: createdAt,
            shortDescription: found.shortDescription,
            content: found.content,
            blogId: found.blogId,
            blogName: found.blogName
        }
        //  return  result
        // const foundedPost = db.posts.find((el: any) => el.id === post.id)
        //
        // if (foundedPost) {
        //     return {...foundedPost, id: post.id}
        // }
        // let newPosts = {...post, id: generateUniqueId(), blogId: '1', blogName: generateUniqueId()}
        // db.posts.push(newPosts)
        //
        // return {...newPosts}
    }


    static async deletePost(id: string) {
        const result = await postCollection.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount
    }

    static async updatePost(id: string, post: PostType) {
        const objectId = new ObjectId(id);
        console.log(id,'id')
        const found: any = await postCollection.findOne({_id: objectId})
        console.log(found,'found')

        let result = await postCollection.updateOne({_id: objectId}, {
            $set: {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId
            }
        })

        console.log(result,'result')
        return !!result.matchedCount
    }


}

