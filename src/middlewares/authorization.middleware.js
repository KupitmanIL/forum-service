import * as postService from "../services/post.service.js";

export const hasRole = role => (req, res, next) => req.principal.roles.includes(role.toUpperCase().trim())  ? next() : res.status(403).json({message: 'Access denied'});

export const isOwner = paramName => (req, res, next) => req.params[paramName] === req.principal.userName ? next() : res.status(403).json({message: 'Access denied'});

export const isOwnerOrHasRole = (paramName, role ) => (req, res, next) => {
    const isOwner = req.params[paramName] === req.principal.userName;
    const hasRole = req.principal.roles.includes(role.toUpperCase().trim());
    return isOwner || hasRole ? next() : res.status(403).json({message: 'Access denied'});
}

export const isPostOwner = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        const isOwner = post.author === req.principal.userName;
        return isOwner ? next() : res.status(403).json({ message: 'Access denied' });
    } catch (e) {
        return next(e);
    }
};

export const isPostOwnerOrHasRole = role => async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        const isOwner = post.author === req.principal.userName;
        const hasRole = req.principal.roles.includes(role.toUpperCase().trim());
        return isOwner || hasRole ? next() : res.status(403).json({ message: 'Access denied' });
    } catch (e) {
        return next(e);
    }
}

