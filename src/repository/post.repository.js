import Post from '../models/post.model.js';

export const createPost = async (postData) => {
    return Post.create(postData);
}

export const getPostById = async (id) => {
    return Post.findById(id);
}

export const deletePost = async (id) => {
    return Post.findByIdAndDelete(id);
}

export const addLike = async (id) => {
    return Post.findByIdAndUpdate(id, {$inc:{likes:1}}, );
}

export const getPostsByAuthor = async (author) => {
    return Post.find({ author });
}

export const addComment = async (id, commenter, content) => {
    return Post.findByIdAndUpdate(
        id, {$push: {comments: {user: commenter, message: content, likes: 0}}},
        {
            returnDocument: "after"
        }
    );
}

export const getPostsByTags = async (tags) => {
    return Post.find({
        tags: { $in: tags }
    });
}

export const getPostsByPeriod = async (dateFrom, dateTo) => {
    return Post.find({
        dateCreated: {
            $gte: dateFrom,
            $lte: dateTo
        }
    });
}

export const updatePost = async (id, data) => {
    return Post.findByIdAndUpdate(
        id,
        data,
        {
            returnDocument: "after"
        }
    );
}