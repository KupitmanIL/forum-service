import { Router } from 'express';

import {
    addPost,
    findPostById,
    addLike,
    findPostsByAuthor,
    addComment,
    deletePost,
    findPostsByTags,
    findPostsByPeriod,
    updatePost
} from '../controller/forumController.js';

import {
    validateAddPost,
    validateId,
    validateAuthor,
    validateComment,
    validateTagsQuery,
    validatePeriodQuery,
    validateUpdatePost
} from '../validator/forumValidator.js';

const router = Router();

router.post('/forum/post/:user', validateAddPost, addPost);

router.get('/forum/post/:id', validateId, findPostById);

router.patch('/forum/post/:id/like', validateId, addLike);

router.get('/forum/posts/author/:author', validateAuthor, findPostsByAuthor);

router.patch('/forum/post/:id/comment/:commenter', validateComment, addComment);

router.delete('/forum/post/:id', validateId, deletePost);

router.get('/forum/posts/tags', validateTagsQuery, findPostsByTags);

router.get('/forum/posts/period', validatePeriodQuery, findPostsByPeriod);

router.patch('/forum/post/:id', validateUpdatePost, updatePost);

export default router;