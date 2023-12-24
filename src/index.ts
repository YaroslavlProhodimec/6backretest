import {MongoClient} from 'mongodb';
import dotenv from 'dotenv'
import {productsRouter} from "./routes/products-router";
import {app} from "./settings";
import {blogRoute} from "./routes/blog-route";
import {OutputBlogType} from "./types/blog/output";
app.use('/products',productsRouter)
app.use('/blogs',blogRoute)

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
// "name": "string",
//     "description": "string",
//     "websiteUrl": "https://nm0Q.GWyzt0V608mS66b1EP7hBP_tCxjSIWBJ300sSbWqMTyGZbHmDfok8qBKeBRkdKuENpBmHk8HpV.6M5mcqL0.3JG"
export const postCollection = db.collection('post')

const startApp = async () => {
    await  runDb()
    app.listen(port, async ()=>{
        console.log(`Listen on port ${port}`)
    })
}
app.get('/', (req:any, res:any) => {
    res.send('Hello, МИР!');
});
app.delete('/all-data', async (req:any, res:any) => {
    const result =    await blogCollection.deleteMany({})
    const result2 =    await postCollection.deleteMany({})
    return !!result.deletedCount && !!result2.deletedCount

});


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
