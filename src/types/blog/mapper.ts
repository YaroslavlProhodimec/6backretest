import {WithId} from "mongodb";
// import {BlogType, OutputBlogType} from "./output";

export const blogMapper = (blog:WithId<any>):any => {
    return {
        id:blog._id.toString(),
        name:blog.name,
        description:blog.description,
        websiteUrl:blog.websiteUrl,
        isMembership: false,
        createdAt:blog.createdAt.toISOString()
    }
}