import {Router} from "express";
import {
    hasRole,
    isOwner,
    isOwnerOrHasRole, isPostOwner, isPostOwnerOrHasRole,
} from "../middlewares/authorization.middleware.js";
import {ADMIN} from "../configuration/constants.js";

const router = Router();

router.all('/account/user/:login/role/:role', hasRole(ADMIN));
router.patch('/account/user/:login', isOwner('login'));
router.delete('/account/user/:login', isOwnerOrHasRole('login', ADMIN));

router.post('/forum/post/:author', isOwner('author'));
router.patch('/forum/post/:id/comment/:commenter', isOwner('commenter'));
router.patch('/forum/post/:id', isPostOwner);
router.delete('/forum/post/:id', isPostOwnerOrHasRole(ADMIN));
export default router;