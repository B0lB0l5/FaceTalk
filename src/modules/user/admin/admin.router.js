import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
} from './admin.user.controller.js';

import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById
} from './admin.post.controller.js';

import {
  createComment,
  updateComment,
  deleteComment,
  getAllComments
} from './admin.comment.controller.js';

import { isAdmin } from '../../../middleware/authorization.js';

const adminRouter = express.Router();

// User management routes
adminRouter.post('/user', isAdmin, createUser);
adminRouter.put('//user/:id', isAdmin, updateUser);
adminRouter.delete('/user/:id', isAdmin, deleteUser);
adminRouter.get('/user', isAdmin, getAllUsers);

// Post management routes
adminRouter.post('/post', isAdmin, createPost);
adminRouter.put('/post/:id', isAdmin, updatePost);
adminRouter.delete('/post/:id', isAdmin, deletePost);
adminRouter.get('/post', isAdmin, getAllPosts);
adminRouter.get('/post/:id', isAdmin, getPostById);

// Comment management routes
adminRouter.post('/comment', isAdmin, createComment);
adminRouter.put('/comment/:id', isAdmin, updateComment);
adminRouter.delete('/comment/:id', isAdmin, deleteComment);
adminRouter.get('/comment', isAdmin, getAllComments);

export default adminRouter;
