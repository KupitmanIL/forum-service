import {Router} from "express";
import {hasRole, isOwner, isOwnerOrHasRole, isPostOwner} from "../middlewares/authorization.middleware.js";
import {ADMIN} from "../configuration/constants.js";

const router = Router();

router.all('/account/user/:login/role/:role', hasRole(ADMIN));
router.patch('/account/user/:user', isOwner('user'));
router.delete('/account/user/:login', isOwnerOrHasRole('login', ADMIN));

router.post('/forum/post/:author', isPostOwner('author'));

export default router;