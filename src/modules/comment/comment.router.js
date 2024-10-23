import { Router } from 'express';
import { createComment, getCommentsByPostId, updateComment, deleteComment } from './comment.controller.js';

const commentRouter = Router();

commentRouter.get('/:postId', getCommentsByPostId);
commentRouter.post('/', createComment);
commentRouter.put('/:id', updateComment);
commentRouter.delete('/:id', deleteComment);

export default commentRouter;
