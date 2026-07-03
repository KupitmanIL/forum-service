import * as service from '../service/forumService.js';

const notFound = (req, res, id) => {
    return res.status(404).send({
        timestamp: new Date().toISOString(),
        status: 404,
        error: 'Not Found',
        message: `Post with id = ${id} not found`,
        path: req.path
    });
};

export const addPost = async (req, res) => {
    const post = await service.addPost(req.params.user, req.body);
    return res.status(201).json(post);
};

export const findPostById = async (req, res) => {
    const post = await service.findPostById(req.params.id);

    if (post) {
        return res.json(post);
    }

    return res.status(404).send();
};

export const addLike = async (req, res) => {
    const success = await service.addLike(req.params.id);

    if (success) {
        return res.status(204).send();
    }

    return res.status(404).send();
};

export const findPostsByAuthor = async (req, res) => {
    const posts = await service.findPostsByAuthor(req.params.author);
    return res.json(posts);
};

export const addComment = async (req, res) => {
    const post = await service.addComment(
        req.params.id,
        req.params.commenter,
        req.body.message
    );

    if (post) {
        return res.json(post);
    }

    return res.status(404).send();
};

export const deletePost = async (req, res) => {
    const post = await service.deletePost(req.params.id);

    if (post) {
        return res.json(post);
    }

    return notFound(req, res, req.params.id);
};

export const findPostsByTags = async (req, res) => {
    const tags = req.query.values
        ? req.query.values.split(',').map(tag => tag.trim())
        : [];

    const posts = await service.findPostsByTags(tags);
    return res.json(posts);
};

export const findPostsByPeriod = async (req, res) => {
    const posts = await service.findPostsByPeriod(
        req.query.dateFrom,
        req.query.dateTo
    );

    return res.json(posts);
};

export const updatePost = async (req, res) => {
    const post = await service.updatePost(req.params.id, req.body);

    if (post) {
        return res.json(post);
    }

    return res.status(404).send();
};