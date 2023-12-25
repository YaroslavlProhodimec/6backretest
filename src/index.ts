import dotenv from 'dotenv'
import {app} from "./settings";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
// import {testingRouter} from "./testing-router";
import {MongoClient} from 'mongodb';
import {BlogType} from "./types/blog/output";
import {PostType} from "./types/post/output";
import {testingRouter} from "./testing-router";

// app.use('/testing',testingRouter)

dotenv.config()


const port  = 5000

app.use('/blogs',blogRoute)
app.use('/posts',postRoute)
app.use('/testing',testingRouter)
export const mongoURI = process.env.MONGO_URL
// @ts-ignore
export const client = new MongoClient(mongoURI);
export const dbBlogs = client.db('node-blogs')

export const blogCollection = dbBlogs.collection<BlogType>('blogs')
export const postCollection = dbBlogs.collection<PostType>('post')
export       async function runDb() {
    try {
        await client.connect()
    } catch (e){
        await client.close()
    }
}

const startApp = async () => {
    await  runDb()
    app.listen(port, async ()=>{
        console.log(`Listen on port ${port}`)
    })
}

// app.delete('/testing/all-data',
//     async (req:any, res:any) => {
//     try {
//         await blogCollection.deleteMany({})
//         await postCollection.deleteMany({})
//
//         res.sendStatus(204)
//     } catch (error) {
//         console.error('Error clearing the database:', error);
//         res.sendStatus(404)
//     }
// });



startApp()

// import {MongoClient} from 'mongodb';
// import dotenv from 'dotenv'
// import {postRoute} from "./routes/post-route";
// import {app} from "./settings";
// import {blogRoute} from "./routes/blog-route";
// import {BlogType} from "./types/blog/output";
// dotenv.config()
// const port  = 5000
//
// app.use('/blogs',blogRoute)
// app.use('/posts',postRoute)
// const mongoURI = process.env.MONGO_URL
//     // || 'mongodb://0.0.0.0:27017'
// // const mongoURI = 'mongodb+srv://admin:<admin>@cluster0.ynbvgcq.mongodb.net/?retryWrites=true&w=majority'
//
// // mongodb+srv://admin:<password>@cluster0.ynbvgcq.mongodb.net/
// console.log(process.env.MONGO_URL)
// // const mongoUri =
// //      process.env.mongoURI ||
// //     'mongodb://0.0.0.0:27017'
//
// // @ts-ignore
// const client = new MongoClient(mongoURI);
//
// const db = client.db('node-blog')
//
// export const blogCollection = db.collection<BlogType>('blog')
//
//
// export const postCollection = db.collection('post')
//
//
// const startApp = async () => {
//     await  runDb()
//     app.listen(5000, async ()=>{
//
//         console.log(`Listen on port ${port}`)
//     })
// }
//
// export  async function runDb() {
//     try {
//         await client.connect()
//         // await client.db('products').command({ping: 1})
//         console.log('Connected successfully to mongo server')
//     } catch (e){
//         console.log(`${e}`)
//         await client.close()
//     }
// }
// startApp()