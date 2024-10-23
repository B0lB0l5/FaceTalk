import { Router } from 'express';
import { createComment, getCommentsByPostId, updateComment, deleteComment } from './comment.controller.js';
import { isAuthenticated } from '../../middleware/authorization.js';

const commentRouter = Router();

commentRouter.get('/:postId', getCommentsByPostId);
commentRouter.post('/', isAuthenticated, createComment);
commentRouter.put('/:id', isAuthenticated, updateComment);
commentRouter.delete('/:id', isAuthenticated, deleteComment);

export default commentRouter;
