// import {db} from '../db/db'
// import {generateUniqueId} from "./blog-repository";
//
// export class PostRepository {
//
//     static getAllPosts() {
//         return db.posts
//     }
//
//     static addPost(post: PostType) {
//
//         const foundedPost = db.posts.find((el) => el.id === post.id)
//
//         if (foundedPost) {
//             return {...foundedPost, id: post.id}
//         }
//         let newPosts = {...post, id: generateUniqueId(), blogId:'1', blogName: generateUniqueId()}
//         db.posts.push(newPosts)
//
//         return {...newPosts}
//     }
//
//     static deletePost(id: string) {
//         let foundedIndexPost: any = db.posts.findIndex(b => b.id === id)
//         if (foundedIndexPost === -1) {
//             return null
//         }
//         db.posts.splice(foundedIndexPost, 1)
//
//         return foundedIndexPost
//     }
//
//     static updatePost(id: string, blog: PostType) {
//         let foundedIndexPost: any = db.posts.findIndex(b => b.id === id)
//         let foundedPost: any = db.posts.find(b => b.id === id)
//         let {blogId, title, shortDescription, content,} = blog
//         if (foundedIndexPost === -1) {
//             return null
//         }
//         const updatedPost = {
//             ...foundedPost, blogId,
//             title, shortDescription, content,
//         }
//         db.posts.splice(foundedIndexPost, 1, updatedPost)
//
//
//         return updatedPost
//     }
//
//     static getPostById(id: string) {
//         const post = db.posts.find(b => b.id === id)
//         if (!post) {
//             return null
//         }
//         return post
//     }
// }
//
