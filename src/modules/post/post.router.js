import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from './post.controller.js';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
