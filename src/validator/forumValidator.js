const isString = value => typeof value === 'string' && value.trim().length > 0;

const isStringArray = value => {
    return Array.isArray(value)
        && value.length > 0
        && value.every(item => isString(item));
};

const isValidDate = value => {
    return isString(value) && !Number.isNaN(Date.parse(value));
};

const badRequest = (res, message) => {
    return res.status(400).json({ message });
};

export const validateAddPost = (req, res, next) => {
    const { title, content, tags } = req.body;

    if (!isString(req.params.user)) {
        return badRequest(res, 'User is required');
    }

    if (!isString(title)) {
        return badRequest(res, 'Title is required');
    }

    if (!isString(content)) {
        return badRequest(res, 'Content is required');
    }

    if (!isStringArray(tags)) {
        return badRequest(res, 'Tags must be a non-empty array of strings');
    }

    next();
};

export const validateId = (req, res, next) => {
    if (!isString(req.params.id)) {
        return badRequest(res, 'Post id is required');
    }

    next();
};

export const validateAuthor = (req, res, next) => {
    if (!isString(req.params.author)) {
        return badRequest(res, 'Author is required');
    }

    next();
};

export const validateComment = (req, res, next) => {
    if (!isString(req.params.id)) {
        return badRequest(res, 'Post id is required');
    }

    if (!isString(req.params.commenter)) {
        return badRequest(res, 'Commenter is required');
    }

    if (!isString(req.body.message)) {
        return badRequest(res, 'Message is required');
    }

    next();
};

export const validateTagsQuery = (req, res, next) => {
    if (!isString(req.query.values)) {
        return badRequest(res, 'Query parameter values is required');
    }

    next();
};

export const validatePeriodQuery = (req, res, next) => {
    const { dateFrom, dateTo } = req.query;

    if (!isValidDate(dateFrom)) {
        return badRequest(res, 'dateFrom must be a valid date');
    }

    if (!isValidDate(dateTo)) {
        return badRequest(res, 'dateTo must be a valid date');
    }

    if (new Date(dateFrom) > new Date(dateTo)) {
        return badRequest(res, 'dateFrom must be before dateTo');
    }

    next();
};

export const validateUpdatePost = (req, res, next) => {
    const { title, content, tags } = req.body;

    if (!isString(req.params.id)) {
        return badRequest(res, 'Post id is required');
    }

    if (
        title === undefined &&
        content === undefined &&
        tags === undefined
    ) {
        return badRequest(res, 'At least one field must be provided');
    }

    if (title !== undefined && !isString(title)) {
        return badRequest(res, 'Title must be a non-empty string');
    }

    if (content !== undefined && !isString(content)) {
        return badRequest(res, 'Content must be a non-empty string');
    }

    if (tags !== undefined && !isStringArray(tags)) {
        return badRequest(res, 'Tags must be a non-empty array of strings');
    }

    next();
};