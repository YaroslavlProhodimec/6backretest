import dotenv from 'dotenv'
import {productsRouter} from "./routes/products-router";
import {app} from "./settings";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {runDb} from "./db/db";
// import {testingRouter} from "./testing-router";

import {blogCollection, postCollection} from "./db/db-collections";
app.use('/products',productsRouter)
app.use('/blogs',blogRoute)
app.use('/posts',postRoute)
// app.use('/testing',testingRouter)

dotenv.config()
const port  = 5000
export const mongoURI = process.env.MONGO_URL
// @ts-ignore
export const client = new MongoClient(mongoURI);

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

app.delete('/testing/all-data',
    async (req:any, res:any) => {
    try {
        await blogCollection.deleteMany({})
        await postCollection.deleteMany({})

        res.sendStatus(204)
    } catch (error) {
        console.error('Error clearing the database:', error);
        res.sendStatus(404)
    }
});



startApp()
