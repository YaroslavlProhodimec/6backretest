import {MongoClient} from "mongodb";
import {mongoURI} from "../utils/common";

// @ts-ignore
export const client = new MongoClient(mongoURI);

export       async function runDb() {
    try {
        await client.connect()
    } catch (e){
        await client.close()
    }
}