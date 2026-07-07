import * as postRepository from "../repository/post.repository.js";

export const createPost = async (author, data) => {
    const tags = [...new Set(data.tags)]
    return await postRepository.createPost({author, ...data, tags});
}

export const getPostById = async (id) => {
    const post = await postRepository.getPostById(id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    return post;
}

export const deletePost = async (id) => {
    const post = await postRepository.deletePost(id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    return post;
}

export const addLike = async (id) => {
    const post = await postRepository.addLike(id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    return post;
}

export const getPostsByAuthor = async (author) => {
    return postRepository.getPostsByAuthor(author);
}

export const addComment = async (id, commenter, content) => {
    const post = await postRepository.addComment(id, commenter, content);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    return post;
}

export const getPostsByTags = async (tagsString) => {
    const tags = tagsString.split(",");
    return postRepository.getPostsByTags(tags);
}

export const getPostsByPeriod = async (dateFrom, dateTo) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    return postRepository.getPostsByPeriod(from, to);
}

export const updatePost = async (id, postData) => {
    const post = await postRepository.updatePost(id, postData);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    return post;
}