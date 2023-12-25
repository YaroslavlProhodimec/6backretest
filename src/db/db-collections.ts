import {BlogType} from "../types/blog/output";
import {PostType} from "../types/post/output";
import {client} from "./db";

export const dbBlogs = client.db('node-blogs')

export const blogCollection = dbBlogs.collection<BlogType>('blogs')
export const postCollection = dbBlogs.collection<PostType>('post')
export const videosCollection = dbBlogs.collection<VideoType>('videos')