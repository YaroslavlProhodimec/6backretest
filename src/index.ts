import {MongoClient} from 'mongodb';
import dotenv from 'dotenv'
import {productsRouter} from "./routes/products-router";
import {app} from "./settings";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {authMiddleware} from "./middlewares/auth/auth-middleware";
app.use('/products',productsRouter)
app.use('/blogs',blogRoute)
app.use('/posts',postRoute)

dotenv.config()
const port  = 5000


const mongoURI =
    process.env.MONGO_URL
    // ||
    // 'mongodb://0.0.0.0:27017'

console.log(process.env.MONGO_URL)

// @ts-ignore
const client = new MongoClient(mongoURI);
const db = client.db('node-blog')

export const blogCollection = db.collection ('blog')
export const postCollection  = db.collection('post')

// "name": "string",
//     "description": "string",
//     "websiteUrl": "https://nm0Q.GWyzt0V608mS66b1EP7hBP_tCxjSIWBJ300sSbWqMTyGZbHmDfok8qBKeBRkdKuENpBmHk8HpV.6M5mcqL0.3JG"

const startApp = async () => {
    await  runDb()
    app.listen(port, async ()=>{
        console.log(`Listen on port ${port}`)
    })
}
app.get('/', (req:any, res:any) => {
    res.send('Hello, МИР!');
});

app.delete('/testing/all-data',authMiddleware,async (req:any, res:any) => {
    try {
    // const result =
        await blogCollection.deleteMany({})
    // const result2 =
        await postCollection.deleteMany({})

        // const deletedCount = !!result.deletedCount && !!result2.deletedCount
        res.sendStatus(204)
    } catch (error) {
        console.error('Error clearing the database:', error);
        res.sendStatus(404)
    }
});
// app.delete('/all-data', async (req:any, res:any) => {
//     const result =    await blogCollection.deleteMany({})
//     const result2 =    await postCollection.deleteMany({})
//     const deletedCount = !!result.deletedCount && !!result2.deletedCount
//
//
//
//     if(!deletedCount){
//         res.sendStatus(404)
//     }
//     res.sendStatus(204)
//     // const result1 = await blogCollection.deleteMany({});
//     //
//     // const result2 = await postCollection.deleteMany({});
//     // const deletedCount = result1.deletedCount && result2.deletedCount;
//     //
//     // if (!deletedCount) {
//     //     res.sendStatus(404);
//     // } else {
//     //     res.sendStatus(204);
//     // }
// });
//

export       async function runDb() {
    try {
        await client.connect()
        // await client.db('products').command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch (e){
        console.log(`${e}`)
        console.error('Error creating product:', e);
        await client.close()
    }
}
startApp()
